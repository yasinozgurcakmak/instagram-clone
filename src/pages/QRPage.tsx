import { useParams } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import Button from "../components/base/Button";
import Menu from "../components/block/Menu";

const QRPage = () => {
  const {username} = useParams();
  const url = import.meta.env.VITE_URL + "/profile/" + username;
  const downloadCode = () => {
    const canvas = document.getElementById("QR") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${username}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <section className="bg-black flex">
      <Menu />
      <div className="flex w-3/6 m-auto">
        <div >
           <QRCode
              value={url}      
              size={250}
              qrStyle="dots"
              eyeRadius={5} 
              id={"QR"}
            />
        </div>
        <div className="ml-10 my-auto">
            <h1 className="text-white text-4xl">QR code helps people follow you quickly</h1>
            <p className="text-white my-6">People can scan your QR code with their smartphone's camera to see your profile. Download and print your QR code, then stick it on your products, posters and more.</p>
            <Button onClick={() =>downloadCode()} size="max">Download Qr</Button>
        </div>
      </div>
    </section>
  );
};

export default QRPage;
