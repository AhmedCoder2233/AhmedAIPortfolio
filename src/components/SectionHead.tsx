import Reveal from './Reveal'

export default function SectionHead({ id, title, text }: { id: string; title: React.ReactNode; text?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <h2 id={id} className="text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98]">{title}</h2>
      {text && <p className="mt-6 max-w-xl text-lg text-muted">{text}</p>}
    </Reveal>
  )
}
