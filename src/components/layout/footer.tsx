export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-12 border-t">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} AngularFlow. Built with Next.js.</p>
        <p className="text-muted-foreground mt-1">Demonstrating Angular-like features.</p>
      </div>
    </footer>
  );
}
