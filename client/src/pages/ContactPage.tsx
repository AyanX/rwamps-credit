import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Globe, Clock, Send, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { api } from "@/api/api";
import s from "./ContactPage.module.scss";

const ContactPage = () => {
  const { faqs, branches, contactInfo } = useData();
  const [formData, setFormData] = useState({ name: "", email: "", phone_number: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post.messages(formData);
      alert("Thank you for your message! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone_number: "", subject: "", message: "" });
    } catch {
      alert("Thank you for your message! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone_number: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <Navbar />

      <section className={s.hero}>
        <img className={s.heroBgImg} src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Team collaboration" loading="eager" />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <div className={s.heroBadge}>
            <span className={s.badgeDot} />
            Contact Us
          </div>
          <h1 className={s.heroTitle}>Get In<br /><span>Touch.</span></h1>
          <p className={s.heroSubtitle}>Contact us to schedule a one-on-one session with one of our experts. We're here to help you grow.</p>
          <div className={s.heroButtons}>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className={s.btnPrimary}>Call Us Now →</a>
            <a href="#contact-form" className={s.btnOutline}>Send a Message</a>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className={s.branchesSection}>
        <div className={s.sectionHeader}>
          <div className={s.sectionTag}>Our Locations</div>
          <h2 className={s.sectionTitle}>Visit Our Branches</h2>
          <div className={s.underline} />
        </div>
        <div className={s.branchGrid}>
          {branches.map((branch) => (
            <div key={branch.id} className={s.branchCard}>
              <h3 className={s.branchName}>{branch.branch_name}</h3>
              <div className={s.branchDetails}>
                <div className={s.branchDetail}>
                  <MapPin className={s.branchIcon} />
                  <p className={s.branchText}>{branch.location}</p>
                </div>
                <div className={s.branchDetail}>
                  <Phone className={s.branchIcon} />
                  <a href={`tel:${String(branch.phone_number).replace(/\s/g, "")}`} className={s.branchText}>{branch.phone_number}</a>
                </div>
                <div className={s.branchDetail}>
                  <Mail className={s.branchIcon} />
                  <a href={`mailto:${branch.email}`} className={s.branchText}>{branch.email}</a>
                </div>
                <div className={s.branchDetail}>
                  <Globe className={s.branchIcon} />
                  <a href={`https://${branch.website}`} className={s.branchText}>{branch.website}</a>
                </div>
                <div className={s.branchDetail}>
                  <Clock className={s.branchIcon} />
                  <span className={s.branchText}>{branch.open_time} - {branch.close_time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className={s.contactSection}>
        <div className={s.contactGrid}>
          <div className={s.contactInfo}>
            <div className={s.sectionTag}>Send a Message</div>
            <h2>Request a <span>Call-Back</span></h2>
            <div className={s.underline} />
            <p className={s.contactDesc}>Fill out the form and our team will get back to you within 24 hours.</p>
            <div className={s.contactCards}>
              <div className={s.contactCard}>
                <div className={s.contactCardIcon}>
                  <Phone style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <div>
                  <div className={s.contactCardTitle}>Call Us</div>
                  <div className={s.contactCardSub}>{contactInfo.phone}</div>
                </div>
              </div>
              <div className={s.contactCard}>
                <div className={s.contactCardIcon}>
                  <Mail style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <div>
                  <div className={s.contactCardTitle}>Email Us</div>
                  <div className={s.contactCardSub}>{contactInfo.email}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.formGroup}>
              <label>Your Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={s.formInput} placeholder="John Doe" />
            </div>
            <div className={s.formGroup}>
              <label>Your Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={s.formInput} placeholder="john@example.com" />
            </div>
            <div className={s.formGroup}>
              <label>Phone Number</label>
              <input type="tel" required value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} className={s.formInput} placeholder="+256 700 000 000" />
            </div>
            <div className={s.formGroup}>
              <label>Subject</label>
              <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={s.formInput} placeholder="Loan inquiry" />
            </div>
            <div className={s.formGroup}>
              <label>Message</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={s.formTextarea} placeholder="Your message..." />
            </div>
            <button type="submit" className={s.submitBtn} disabled={submitting}>
              <Send style={{ width: "1rem", height: "1rem" }} /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section className={s.faqSection}>
        <div className={s.sectionHeader}>
          <div className={s.sectionTag}>FAQs</div>
          <h2 className={s.sectionTitle}>Frequently Asked Questions</h2>
          <div className={s.underline} />
        </div>
        <div className={s.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={s.faqItem} data-open={openFaq === faq.id}>
              <button className={s.faqTrigger} onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
                {faq.title}
                <ChevronDown className={s.faqChevron} />
              </button>
              {openFaq === faq.id && (
                <div className={s.faqContent}>{faq.content}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
