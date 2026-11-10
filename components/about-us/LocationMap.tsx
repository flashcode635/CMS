const locations = [
  { name: "New Delhi", shortName: "Delhi", left: "48%", top: "26%", featured: true },
  { name: "Mumbai", shortName: "Mumbai", left: "24%", top: "66%" },
  { name: "Bengaluru", shortName: "Bengaluru", left: "43%", top: "80%" },
  { name: "Chennai", shortName: "Chennai", left: "62%", top: "78%" },
  { name: "Kolkata", shortName: "Kolkata", left: "78%", top: "50%" },
];

function LocationPin({ featured }: { featured?: boolean }) {
  return (
    <span
      className={[
        "relative flex items-center justify-center rounded-full border-4 border-white shadow-lg shadow-brand-royal/28",
        featured ? "size-12 bg-brand-champagne" : "size-9 bg-brand-blue",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="size-2.5 rounded-full bg-white" />
      {featured && (
        <span className="absolute -inset-1.75 rounded-full border border-brand-champagne/45 animate-ping" />
      )}
    </span>
  );
}

export default function LocationMap() {
  return (
    <section className="w-full px-2 py-8 sm:px-4 lg:px-10 lg:py-12">
      <div className="mx-auto flex max-w-300 flex-col gap-8">
        {/* <div className="flex flex-col gap-3 text-center">
          <p
            className="m-0 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Find us across India
          </p>
          <h2
            className="m-0 text-3xl font-bold text-ink sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Locations
          </h2>
          <p
            className="mx-auto m-0 max-w-175 text-sm leading-6 text-body sm:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Connect with our team at one of our offices and counselling
            centres across India.
          </p>
        </div> */}

        <div
          className="relative isolate min-h-105 overflow-hidden rounded-4xl border border-white/80 bg-surface-alt shadow-lg shadow-brand-royal/16 sm:min-h-135 lg:min-h-155"
          aria-label="Illustrated map showing My Study Hub locations across India"
        >
          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 1200 650"
            preserveAspectRatio="none"
            role="img"
            aria-label="Stylized map with roads and waterways"
          >
            <path
              d="M-70 110 C150 40 220 230 420 145 S750 85 1270 155"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="42"
            />
            <path
              d="M-70 110 C150 40 220 230 420 145 S750 85 1270 155"
              fill="none"
              stroke="var(--color-surface)"
              strokeWidth="25"
            />
            <path
              d="M-100 520 C120 410 250 510 390 420 S690 365 830 470 S1070 570 1300 420"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="38"
            />
            <path
              d="M-100 520 C120 410 250 510 390 420 S690 365 830 470 S1070 570 1300 420"
              fill="none"
              stroke="white"
              strokeWidth="22"
            />
            <path
              d="M130 -30 C250 120 210 250 350 330 S470 500 430 700"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="30"
            />
            <path
              d="M130 -30 C250 120 210 250 350 330 S470 500 430 700"
              fill="none"
              stroke="white"
              strokeWidth="17"
            />
            <path
              d="M790 -30 C730 140 850 210 780 330 S850 500 760 700"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="35"
            />
            <path
              d="M790 -30 C730 140 850 210 780 330 S850 500 760 700"
              fill="none"
              stroke="white"
              strokeWidth="19"
            />
            <path
              d="M975 -20 C905 130 1060 245 960 380 S1040 550 1000 700"
              fill="none"
              stroke="var(--color-brand-champagne-soft-bg)"
              strokeWidth="48"
            />
            <path
              d="M975 -20 C905 130 1060 245 960 380 S1040 550 1000 700"
              fill="none"
              stroke="var(--color-brand-sky)"
              strokeWidth="33"
            />
            <path
              d="M20 300 C240 280 290 345 500 300 S890 240 1220 300"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="12"
            />
            <path
              d="M20 300 C240 280 290 345 500 300 S890 240 1220 300"
              fill="none"
              stroke="white"
              strokeWidth="6"
            />
            <path
              d="M530 -20 C570 150 500 245 570 355 S640 520 600 700"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="10"
            />
            <path
              d="M530 -20 C570 150 500 245 570 355 S640 520 600 700"
              fill="none"
              stroke="white"
              strokeWidth="5"
            />
          </svg>

          <div className="absolute left-[7%] top-[8%] rounded-full bg-brand-sky/80 px-8 py-4 blur-[1px]" />
          <div className="absolute left-[70%] top-[68%] size-28 rounded-full bg-brand-sky/80 blur-sm" />
          <div className="absolute left-[30%] top-[38%] size-20 rounded-full bg-brand-sky/70 blur-sm" />

          {locations.map((location) => (
            <div
              key={location.name}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: location.left, top: location.top }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <LocationPin featured={location.featured} />
                <span
                  className={[
                    "whitespace-nowrap rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm sm:text-sm",
                    location.featured ? "text-amber-700" : "text-ink",
                  ].join(" ")}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {location.name}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 px-4 py-3 text-xs text-ink shadow-sm backdrop-blur-sm sm:bottom-7 sm:left-7 sm:text-sm">
            <span className="mr-2 inline-block size-2.5 rounded-full bg-brand-blue" />
            My Study Hub offices
          </div>
        </div>
      </div>
    </section>
  );
}
