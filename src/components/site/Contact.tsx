import type { ReactNode } from "react";
import { ArrowDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, demoDetails, detail } from "@/config/business";
import { buildMailto, buildTelUrl, displayPhone } from "@/lib/contact";
import { isWhatsAppConfigured } from "@/lib/whatsapp";
import { enquiryChecklist } from "@/config/content";
import { Annot } from "./Graphics";
import { EnquiryForm } from "./EnquiryForm";
import { Reveal } from "./Motion";
import { WhatsAppLink } from "./WhatsAppLink";

function Sample() {
  return (
    <span className="annot ml-2 border border-current px-1.5 py-0.5 align-middle text-[0.6rem] opacity-80">
      Sample
    </span>
  );
}

interface ChannelProps {
  icon: ReactNode;
  label: string;
  value: string;
  sample: boolean;
  /** The action control (link or disabled span). */
  action: ReactNode;
}

function Channel({ icon, label, value, sample, action }: ChannelProps) {
  return (
    <li className="group grid grid-cols-[3rem_1fr_auto] items-center gap-x-4 border-b border-ivory/20 py-4">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center border border-ivory/30 transition-colors duration-500 group-hover:bg-ivory group-hover:text-accent-deep"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="annot opacity-75">{label}</p>
        <p className="mt-1 [overflow-wrap:anywhere]">
          {value}
          {sample && <Sample />}
        </p>
      </div>
      {action}
    </li>
  );
}

const actionCls =
  "inline-flex min-h-11 items-center gap-2 border border-ivory/40 px-4 text-sm font-semibold transition-colors hover:bg-ivory hover:text-accent-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-transparent aria-disabled:hover:text-ivory";

function Disabled({ children, why }: { children: ReactNode; why: string }) {
  return (
    <span aria-disabled="true" title={why} className={actionCls}>
      {children}
    </span>
  );
}

export function Contact() {
  const phone = detail(displayPhone(), demoDetails.phone);
  const email = detail(business.email, demoDetails.email);
  const address = detail(business.address, demoDetails.address);
  const tel = buildTelUrl();
  const mail = buildMailto(business.email, "Mural enquiry");
  const waLive = isWhatsAppConfigured();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-accent relative overflow-hidden bg-accent-deep text-ivory"
    >
      <div
        aria-hidden="true"
        className="ruler-x pointer-events-none absolute inset-x-0 top-0 text-ivory"
      />
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-6 gap-y-16 px-5 py-28 md:px-10 md:py-40">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <Annot className="text-ivory/80">Project Enquiry</Annot>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-6 font-display text-[clamp(3.2rem,8.5vw,8rem)] font-light leading-[0.88] tracking-[-0.03em]"
          >
            <span id="contact-title">
              Have a Wall
              <br />
              <em className="italic">in Mind?</em>
            </span>
          </Reveal>
          <Reveal as="p" delay={140} className="mt-8 max-w-md text-lg leading-relaxed">
            Tell us about your space, your ideas and what you would like to create.
          </Reveal>

          <Reveal delay={200} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppLink icon className="btn btn-ink">
              Chat on WhatsApp
            </WhatsAppLink>
            <a href="#location" className="btn btn-outline">
              <MapPin aria-hidden="true" className="size-5" /> Find the studio
            </a>
          </Reveal>

          <Reveal
            as="ul"
            delay={260}
            className="mt-14 max-w-xl border-t border-ivory/40"
            aria-label="Contact channels"
          >
            {phone && (
              <Channel
                icon={<MessageCircle className="size-5" />}
                label="WhatsApp"
                value={phone.value}
                sample={phone.sample}
                action={
                  <WhatsAppLink fallbackHref="#brief" className={actionCls}>
                    {waLive ? "Chat" : "Brief"}
                  </WhatsAppLink>
                }
              />
            )}
            {phone && (
              <Channel
                icon={<Phone className="size-5" />}
                label="Call"
                value={phone.value}
                sample={phone.sample}
                action={
                  tel ? (
                    <a href={tel} className={actionCls}>
                      Call now
                    </a>
                  ) : (
                    <Disabled why="Phone number not configured yet">Call now</Disabled>
                  )
                }
              />
            )}
            {email && (
              <Channel
                icon={<Mail className="size-5" />}
                label="Email"
                value={email.value}
                sample={email.sample}
                action={
                  mail ? (
                    <a href={mail} className={actionCls}>
                      Write
                    </a>
                  ) : (
                    <Disabled why="Email not configured yet">Write</Disabled>
                  )
                }
              />
            )}
            {address && (
              <Channel
                icon={<MapPin className="size-5" />}
                label="Studio"
                value={address.value}
                sample={address.sample}
                action={
                  <a href="#location" className={actionCls}>
                    Map <ArrowDown aria-hidden="true" className="size-4" />
                  </a>
                }
              />
            )}
          </Reveal>

          <Reveal delay={300} className="mt-14 max-w-lg">
            <h3 className="font-display text-2xl">To help us quote, include:</h3>
            <ul className="mt-5 grid gap-x-6 text-sm sm:grid-cols-2">
              {enquiryChecklist.map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-ivory/20 py-3">
                  <span className="font-mono opacity-70">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          id="brief"
          delay={150}
          className="col-span-12 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8"
        >
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
