import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-6 py-32 text-center">
      <span className="text-gradient text-6xl font-bold">404</span>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-sm text-[var(--color-text-secondary)]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </Container>
  );
}
