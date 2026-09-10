import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function QuoteForm() {
  const [form, setForm] = useState({ name: "", designation: "", company: "", mobile: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Contact request submitted.");
  };
  if (submitted) return <div className="quote-success"><strong>Contact request submitted.</strong><span>VPI Innovative Solutions</span></div>;
  return <form className="quote-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>FULL NAME</span><Input name="name" value={form.name} onChange={update} placeholder="Full Name" required /></label>
      <label><span>DESIGNATION</span><Input name="designation" value={form.designation} onChange={update} placeholder="Designation" required /></label>
    </div>
    <div className="form-grid">
      <label><span>COMPANY</span><Input name="company" value={form.company} onChange={update} placeholder="Company" required /></label>
      <label><span>MOBILE NUMBER</span><Input name="mobile" value={form.mobile} onChange={update} placeholder="Mobile Number" required /></label>
    </div>
    <label><span>EMAIL ADDRESS</span><Input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required /></label>
    <Button type="submit" className="submit-button">CONTACT NOW <ArrowUpRight size={16} /></Button>
  </form>;
}
