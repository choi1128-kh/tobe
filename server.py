from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# 정적 파일 제공
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# JSON 데이터 읽기
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        with open('data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# JSON 데이터 저장
@app.route('/api/data', methods=['POST'])
def save_data():
    try:
        data = request.json
        
        # 백업 파일 생성
        if os.path.exists('data.json'):
            import shutil
            shutil.copy('data.json', 'data.json.backup')
        
        # 새 데이터 저장
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        return jsonify({'message': '데이터가 성공적으로 저장되었습니다.', 'success': True})
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 