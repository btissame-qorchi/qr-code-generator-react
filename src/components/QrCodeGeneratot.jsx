import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleQrCode = () => {
    if (text.trim()) {
      setQrCode(text);
      setText("");
    } else {
      alert("Please enter a valid text or URL");
    }
  };

  const downloadQrCode = () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    } else {
      alert("No QR code generated to download.");
    }
  };

  return (
    <div className="qrcode-box">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter a text or URL"
        value={text}
        onChange={handleChange}
      />
      <div ref={qrCodeRef}>
        {qrCode && <QRCodeCanvas value={qrCode} size={120} />}
      </div>
      {text &&<button onClick={handleQrCode}>Generate QR Code</button>}

      {qrCode && <button onClick={downloadQrCode}>Download QR Code</button>}
    </div>
  );
};

export default QRCodeGenerator;
