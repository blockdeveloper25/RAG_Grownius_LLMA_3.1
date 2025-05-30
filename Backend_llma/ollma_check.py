import subprocess

prompt = "Hello, how are you?"

result = subprocess.run(
    ['ollama', 'run', 'llama3.1:8b', prompt],
    capture_output=True,
    text=True
)

print(result.stdout)