import os
import sys
import json
import base64
import easyocr
import cohere
import numpy as np
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv


def main():

    load_dotenv()

    #data = sys.argv
    #print(json.dumps(data))

    data = sys.argv[1][23:]
    
    image = Image.open(BytesIO(base64.b64decode(data)))
    image_numpy = np.array(image)
    
    reader = easyocr.Reader(['en'])
    text = " ".join(reader.readtext(image=image_numpy, detail = 0))
    
    co = cohere.Client(api_key=os.getenv('COHERE_KEY'))

    name = co.generate(
        prompt="""The following text consists of a name of a food and a price. Only tell me the name of the food.\n--\nPrompt: Apple Pie 3.45\nAnswer: Apple Pie\n--\nPrompt: """ + text
    ).generations[0].text

    price = co.generate(
        prompt="""The following text consists of a name of a food and a price. Only tell me the price.\n--\nPrompt: Apple Pie 3.45\nAnswer: $3.45\n--\nPrompt: """ + text
    ).generations[0].text

    result = {
        "name": name,
        "price": price
    }

    print(json.dumps(result))

    sys.stdout.flush()
    



if __name__ == "__main__":
    main()