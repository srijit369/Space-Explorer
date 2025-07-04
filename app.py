import os
import openai
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
app = Flask(__name__)

# Configure OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_astronomy_response(user_query):
    """Generate story-based responses about June 20 astronomical events"""
    prompt = f"""
    You are 'Ask', the storytelling chatbot for Space Explorer website. 
    Respond to queries about June 20 astronomical events throughout history using:
    - Children's storybook style with simple language
    - Maximum 3 sentences
    - Include historical context and scientific facts
    - Focus on events from any year on June 20
    - For non-June 20 queries, gently redirect to the topic
    
    Current query: "{user_query}"
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_query}
        ],
        temperature=0.7,
        max_tokens=150
    )
    return response.choices[0].message['content'].strip()

@app.route('/ask', methods=['POST'])
def ask_endpoint():
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({"error": "Empty message"}), 400
    
    bot_response = get_astronomy_response(user_message)
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
