import { Layout } from "@/components/Layout";
import { StickyActions } from "@/components/StickyActions";
import { HomePage } from "@/pages/HomePage";

export default function App() {
  return (
    <Layout>
      <HomePage />
      <StickyActions />
    </Layout>
  );
}
