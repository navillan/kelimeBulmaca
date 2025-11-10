import $ from "jquery";
import useSendToUs from "../hooks/useSendToUs.js";

function SendToUs({ setShowSendToUs }) {

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
    document.querySelector('.send-to-us-form').style.display = 'none';
  }

  return (
    <div className="send-to-us-wrapper">
      <p style={{ fontWeight: 'bold' }}>Öneri ve görüşleriniz için: </p>
      <button tabIndex={-1} className="send-to-us-button" onClick={() => {$('.send-to-us-form').toggle(); setShowSendToUs(true); $('.send-to-us-button').attr("disabled", true);}}>
        Bize bir e-posta gönderin
      </button>
      <div className="send-to-us-form" style={{ display: 'none' }}>
        <button className="close-form-button" onClick={() => {$('.send-to-us-form').toggle(); setShowSendToUs(false); $('.send-to-us-button').attr("disabled", false);}}>X</button>
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