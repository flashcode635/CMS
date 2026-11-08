"use client";

import Image from "next/image";

function YtLogo() {
  return (
    <Image
      src="/home/party-yt-wordmark.svg"
      alt="Video platform"
      width={90}
      height={20}
      className="object-contain"
    />
  );
}

const videos = [
  { title: "Big Moment: Indian Ambassador at Samara State Medical University", image: "/home/party-video1.jpg" },
  { title: "Fresher's Party Highlights", image: "/home/party-video2.jpg" },
  { title: "Campus Life Highlights", image: "/home/partyone.webp" },
  { title: "Student Life at Samara", image: "/home/partytwo.webp" },
  { title: "Celebrating Our Students", image: "/home/partyThree.webp" },
  { title: "Fresher's Party Highlights", image: "/home/partyFour.webp" },
  { title: "Campus Memories", image: "/home/partyFive.webp" },
  { title: "Student Community", image: "/home/partySix.webp" },
  { title: "University Events", image: "/home/partySeven.webp" },
  { title: "Life at Samara", image: "/home/partyEight.webp" },
  { title: "Student Experiences", image: "/home/partyNine.webp" },
  { title: "Cultural Highlights", image: "/home/partyTen.webp" },
  { title: "Fresher's Party Highlights", image: "/home/partyEleven.webp" },
];

function VideoCard({ title, image }: (typeof videos)[number]) {
  return (
    <article className="relative aspect-video overflow-hidden rounded-3xl bg-ink">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover opacity-75 transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/10" />
      <div className="absolute right-5 top-5 rounded-full bg-black/35 px-3 py-2">
        <YtLogo />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-white/70">My Study Hub</p>
      </div>
    </article>
  );
}

export default function VideoGrid() {
  return (
    <section className="bg-brand-sky px-5 py-10 sm:px-25">
      <article className="relative mb-6 aspect-video w-full overflow-hidden rounded-4xl bg-ink sm:aspect-16/7">
        <Image
          src={videos[0].image}
          alt={videos[0].title}
          fill
          className="object-cover opacity-75"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/10" />
        <div className="absolute right-4 top-4 rounded-full bg-black/35 px-2.5 py-1.5">
          <YtLogo />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <p className="text-lg font-semibold text-white sm:text-2xl">{videos[0].title}</p>
          <p className="mt-1 text-sm text-white/70">My Study Hub</p>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.slice(1).map((video, index) => (
          <VideoCard key={`${video.title}-${index}`} {...video} />
        ))}
      </div>
    </section>
  );
}
