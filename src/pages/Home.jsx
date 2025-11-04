import React from 'react';
import Header from '../components/Header';
import Bio from '../components/Bio';
import Resume from '../components/Resume';
import Projects from '../components/Projects';
import { projects } from '../data/projects'; // import data from new file
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

export default function Home() {
  // Build slides from your Projects list (pick first 3–5)
  const slides = projects.slice(0, 4).map((p) => ({
    src: p.url,
    title: p.title,
    subtitle: p.summary,
    href: p.url,
    cta: 'Live demo',
    kicker: 'Featured',
  }));

  return (
    <>
      <Header slides={slides} height="50vh" />   {/* smaller height */}
      <section id="bio">
        <Bio />
      </section>

      <section id="resume">
        <Resume />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}