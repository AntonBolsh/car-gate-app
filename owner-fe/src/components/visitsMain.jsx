import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function visitsMain() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-4">LBH523</div>
      <div className="p-2">22.05.2024</div>
      <Button variant="secondary">edit</Button>
      <div className="vr" />
      <Button variant="outline-danger">delete</Button>
    </Stack>
  );
}

export default visitsMain;