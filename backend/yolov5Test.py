## Model Inferencing For Image Classification
import torch
from PIL import Image
import torch.nn.functional as F
from torchvision import transforms as T
import pathlib
import argparse
import io
from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS


IMAGENET_MEAN = 0.485, 0.456, 0.406
IMAGENET_STD = 0.229, 0.224, 0.225


def classify_transforms(size=640):
    return T.Compose(
        [
            T.ToTensor(),
            T.Resize(size),
            T.CenterCrop(size),
            T.Normalize(IMAGENET_MEAN, IMAGENET_STD),
        ]
    )


app = Flask(__name__)
CORS(app)

@app.route('/v1/thalassemia-detection', methods=["POST"])
def predictThalassemia():
    if not request.method == "POST":
        return jsonify({"success": False, "error": "Method not allowed"}), 405

    if not request.files.get("image"):
        return (
            jsonify(
                {"success": False, "error": "Request dont have image file attached"}
            ),
            400,
        )

    file = request.files["image"]
    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    transformations = classify_transforms()
    convert_tensor = transformations(image)
    convert_tensor = convert_tensor.unsqueeze(0)  # type: ignore

    results = model(convert_tensor)
    pred = F.softmax(results, dim=1)
    results = {}
    for prob in pred:
        top5i = prob.argsort(0, descending=True)[:5].tolist()
        for j in top5i:
            results[model.names[j]] = prob[j].item()

    return jsonify({"success": True, "results": results})

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=3000, type=int, help="port number")
    args = parser.parse_args()

    temp = pathlib.PosixPath
    pathlib.PosixPath = pathlib.WindowsPath

    model = torch.hub.load("ultralytics/yolov5", "custom", "weight.pt")

    app.run(host="0.0.0.0", port=args.port)  # debug=True causes Restarting with stat
