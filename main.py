from fastapi import FastAPI
from pydantic import BaseModel
import os
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AdRequest(BaseModel):
    product_name: str
    description: str
    audience: str
    tone: str
    platform: str
    imageSize: str  # add this

@app.post("/generate-ad")
def generate_ad(request: AdRequest):
    prompt = f"""Create a compelling {request.tone.lower()} ad for {request.product_name}, a product described as: "{request.description}". 
Target it to {request.audience} on {request.platform}. Make it short and catchy."""

    # Generate ad copy
    chat_response = client.chat.completions.create(
        model="gpt-4-turbo",  # or gpt-3.5-turbo
        messages=[
            {"role": "system", "content": "You are a creative ad copywriter."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=300
    )

    ad_text = chat_response.choices[0].message.content.strip()

    # Generate image using DALL·E
    image_prompt = (f"Ad graphic for {request.product_name} targeting {request.audience} on {request.platform}. Theme: {request.tone}"
                    f"Theme: {request.tone}. Do not include any text, letters, writing,captions, or words in the image." )
    print("📏 Requested image size from frontend:", request.imageSize)
    f"Focus only on the product and its features, in a style suitable for {request.platform}."
    image_response = client.images.generate(
        model="dall-e-3",
        prompt=image_prompt,
        size=request.imageSize,
        quality="standard",
        n=1
    )

    image_url = image_response.data[0].url

    return {"text": ad_text, "imageUrl": image_url}


