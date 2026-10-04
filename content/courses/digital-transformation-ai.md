# Digital transformation, information systems and AI

**References:** Regulation (EU) 2016/679 (GDPR), art. 4, 28, 33 and 83 ; Regulation (EU) 2024/1689 (AI Act), art. 5 (prohibited practices), art. 6 and Annex III (high-risk systems), art. 50 (transparency)

**Key issue:** UE 6 texts on cloud migration, AI in finance or data breaches test both vocabulary and the ability to classify a situation (cloud model, AI risk level, GDPR role) and to explain its consequences for the company.

- **Digital transformation**: using digital technologies to redesign processes, products and business models, not just to computerise existing tasks (**digitisation**). **Legacy systems** (*systèmes hérités*) are old applications that are costly to maintain and hard to integrate; migration is a change management project as much as a technical one.
- **Information system building blocks**: ERP (*progiciel de gestion intégré*: one database shared by finance, sales, purchasing, HR), CRM (customer relationship management), business intelligence (BI) and dashboards, data warehouse / data lake. Master data quality is the usual weak point.
- **Cloud computing**: IaaS (infrastructure: servers and storage), PaaS (platform: development environment), SaaS (software as a service: the provider hosts, updates and runs the application, paid by subscription per user). Benefits: scalability, pay-as-you-go, shift from capex to opex; risks: vendor lock-in, data location, dependence on the provider, exit costs.
- **Automation**: robotic process automation (RPA) mimics a user's clicks on rule-based, repetitive tasks (invoice posting, reconciliations); it does not "understand" documents and breaks when the interface changes.
- **Artificial intelligence**: machine learning (models trained on data), deep learning, **generative AI** and large language models (LLMs) that produce text, images or code. A **hallucination** is a plausible but false output; a "human in the loop" reviews outputs before use. Bias in training data produces biased decisions.
- **AI Act** (risk-based approach): unacceptable risk (prohibited practices, e.g. social scoring, manipulation of vulnerable people), **high risk** (Annex III: AI used to recruit or select candidates, credit scoring, critical infrastructure — strict requirements on risk management, data quality, documentation, human oversight), limited risk (transparency duties, e.g. disclosing that users are talking to a chatbot or that content is AI-generated), minimal risk (no specific obligation, e.g. spam filters).
- **GDPR**: personal data (*données à caractère personnel*); the **controller** (*responsable de traitement*) decides why and how data are processed, the **processor** (*sous-traitant*) processes them on its behalf under a contract (art. 28). A data breach is notified to the supervisory authority within 72 hours (art. 33). Fines can reach €20m or 4% of total worldwide annual turnover, whichever is higher (art. 83).
- **Cybersecurity**: phishing (fraudulent e-mails), ransomware (data encrypted until a ransom is paid), data breach (*violation de données*), multi-factor authentication, backups, business continuity plan.

```diagram
{"type":"tree","title":"AI Act: which risk category?","root":{"label":"What does the AI system do?","children":[{"edge":"social scoring, manipulation","label":"Unacceptable risk","note":"prohibited (art. 5)"},{"edge":"recruitment, credit scoring","label":"High risk","note":"Annex III: data, documentation, human oversight"},{"edge":"chatbot, generated content","label":"Limited risk","note":"transparency duties (art. 50)"},{"edge":"spam filter, game","label":"Minimal risk","note":"no specific obligation"}]}}
```

## Example
A retail chain (worldwide turnover €50m) moves its payroll to a SaaS provider and deploys an AI tool that ranks job applicants' CVs and draws up the interview shortlist. Three questions: cloud model, AI risk level, GDPR responsibility.
Solution: hosting, updates and a per-user monthly fee define **SaaS**. CV screening is listed in Annex III: a **high-risk** system, lawful but subject to risk management, data governance, documentation and human oversight — not prohibited, and not merely a transparency case. The chain remains **controller** of employee and applicant data; the provider is its processor under an art. 28 contract. If the provider suffers a breach, the chain still notifies the authority within 72 hours; its maximum fine is the higher of €20m and 4% × 50 = €2m, i.e. **€20m**.

## Common mistakes
- Thinking the AI Act prohibits any AI decision about people: recruitment AI is high-risk, not banned.
- Classifying recruitment AI as "limited risk" because a human conducts the interviews: human involvement is a requirement of the high-risk category, not a way out of it.
- Believing outsourcing to a SaaS provider transfers GDPR responsibility: the controller stays accountable for its processor.
- Confusing IaaS with SaaS: renting servers to run your own software is IaaS; using the provider's application is SaaS.

## Key points
- Digitisation (paper to digital) ≠ digital transformation (new ways of creating value).
- Using a SaaS provider does not transfer the controller's GDPR responsibility to the provider.
- RPA automates rules; AI handles judgement-like tasks but needs human oversight.
- AI used in recruitment is "high risk" under the AI Act, not prohibited.

**Glossary:** data controller — responsable de traitement · data processor — sous-traitant · data breach — violation de données · legacy system — système hérité · vendor lock-in — dépendance au fournisseur · machine learning — apprentissage automatique · human oversight — contrôle humain · subscription — abonnement

**Related topics:** [Cloud, SaaS et externalisation](/cours/cloud-saas-externalisation) · [Protection des données (RGPD) et SI](/cours/protection-donnees-rgpd-si) · [Intelligence artificielle générative](/cours/intelligence-artificielle-generative) · [Automatisation des processus (RPA)](/cours/automatisation-processus-rpa)
