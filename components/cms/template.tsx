import type { Section } from "@/types/types";
export type TemplateProps = {
  sections: Section[];
  selected: any;
  active: string;
};
export default function Template({sections, selected, active}: TemplateProps) 
{
    return(
        <>
          <div className="mx-auto min-h-175 max-w-225 overflow-hidden rounded-xl
           bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-8">
              <span className="text-xs font-semibold tracking-wide text-brand-green">
                STUDY PALACE HUB
              </span>
            </div>
            <div className="bg-[#eaf4ee] px-5 py-10 sm:px-8 sm:py-16">
              <p className="text-xs font-semibold uppercase tracking-widest
               text-brand-green">{active.slice(0,-1)}</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold
               text-[#14213d] sm:text-4xl">{selected.title || "Your page title"}</h1>
               <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                {String(selected.data.description || 
                  "Your page introduction will appear here.")}
                </p>
            </div>
            <div className="space-y-5 px-5 py-8 sm:px-8 sm:py-10">
              {sections.filter((s) => s.visible).map((section) =>
                 <section key={section.id} className="border-b border-slate-100 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest
                   text-brand-green">{section.label}
                   </p>
                   <h2 className="mt-2 text-xl font-semibold
                    text-[#14213d]">{String(section.data.heading ||
                     "Section heading")
                     }</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7
                   text-slate-500">
                    {String(section.data.body || "Section content preview.")}
                    </p></section>)}
              {sections.length === 0 && 
              <p className="text-sm text-slate-400">
                Add sections to preview the page layout.
                </p>}
            </div>
          </div>
        </>
    )
}