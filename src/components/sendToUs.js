import $ from "jquery";
import useSendToUs from "../hooks/useSendToUs.js";

function SendToUs() {

    const namePattern = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/g;
    const emailPattern = /^[\w._-]+@[\w_-]+(\.[\w_-]{2,})+$/g;

    function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!namePattern.test(name)) {
      alert("Lütfen geçerli bir isim giriniz.");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    const suggestion = { name, email, message };
    useSendToUs(suggestion);
    form.reset();
    $('.send-to-us-form').hide();
  }

  return (
    <div className="send-to-us-wrapper">
      <p style={{ fontWeight: 'bold' }}>Öneri ve görüşleriniz için: </p>
      <button className="send-to-us-button" onClick={() => $('.send-to-us-form').toggle()}>
        Bize bir e-posta gönderin
      </button>
      <div className="send-to-us-form" >
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Adınız" required />
          <input type="email" name="email" placeholder="E-posta adresiniz" required />
          <textarea name="message" placeholder="Mesajınız" required></textarea>
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}
export default SendToUs;