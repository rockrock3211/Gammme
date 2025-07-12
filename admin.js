document.getElementById('adminForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = {
    user: formData.get('user'),
    password: formData.get('password'),
    count: formData.get('count')
  };

  const res = await fetch('/api/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  document.getElementById('message').textContent = text;
});