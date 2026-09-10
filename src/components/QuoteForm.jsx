import { useState } from "react";
import axios from "axios";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function QuoteForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
      setSubmitted(true);
      toast.success("Your request is in motion.");
    } catch (error) {
      toast.error("We couldn’t send that just yet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div className="quote-success" data-testid="quote-success-message"><Check size={20} /><strong>Quote request received.</strong><span>Our engineering team will be in touch shortly.</span></div>;
  }
  return (
    <form className="quote-form" onSubmit={submit} data-testid="quote-form">
      <div className="form-grid">
        <label><span>YOUR NAME</span><Input data-testid="quote-name-input" name="name" value={form.name} onChange={update} placeholder="Name" required /></label>
        <label><span>COMPANY</span><Input data-testid="quote-company-input" name="company" value={form.company} onChange={update} placeholder="Company" required /></label>
      </div>
      <label><span>WORK EMAIL</span><Input data-testid="quote-email-input" type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label>
      <label><span>WHAT ARE YOU BUILDING?</span><Textarea data-testid="quote-message-input" name="message" value={form.message} onChange={update} placeholder="Tell us about your application, material or tolerance..." required /></label>
      <Button data-testid="quote-submit-button" type="submit" disabled={loading} className="submit-button">{loading ? "SENDING..." : "SEND REQUEST"}<ArrowUpRight size={16} /></Button>
    </form>
  );
}