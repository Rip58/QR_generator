import { QRGenerator } from "@/components/qr/QRGenerator";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-12rem)]">
      <QRGenerator />
    </div>
  );
}
