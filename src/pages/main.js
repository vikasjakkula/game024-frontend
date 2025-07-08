import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-xl shadow-lg max-w-4xl mx-auto mt-8 text-zinc-800 dark:text-zinc-100 leading-relaxed tracking-wide space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
        This page is all about this app
      </h2>

      <p>👋 Hi, I’m <strong>Vikas Yadav</strong> — a passionate <span className="text-pink-600 font-medium">Full-Stack Developer</span>, emerging <span className="text-green-500 font-medium">Game Designer</span>, and <span className="text-yellow-500 font-medium">Creative Technologist</span> based in Hyderabad, India.</p>

      <p>Currently pursuing my B.Tech in Computer Science at <strong>NGIT Neil Goata Institute of Technology</strong>, I'm obsessed with creating digital experiences that merge utility, creativity, and innovation.</p>

      <p>🚀 <strong>What I Do:</strong></p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Frontend Development:</strong> Crafting sleek, responsive UIs using <code className="bg-zinc-800 text-white px-1 rounded">React.js</code>, <code className="bg-zinc-800 text-white px-1 rounded">Next.js</code>, and <code className="bg-zinc-800 text-white px-1 rounded">Tailwind CSS</code>. Focused on performance, accessibility, and pixel-perfect execution.
        </li>
        <li>
          <strong>Backend Development:</strong> Building RESTful APIs with <code className="bg-zinc-800 text-white px-1 rounded">Node.js</code> and <code className="bg-zinc-800 text-white px-1 rounded">Express</code>, managing databases using <code className="bg-zinc-800 text-white px-1 rounded">MongoDB</code>, integrating <code className="bg-zinc-800 text-white px-1 rounded">Supabase</code> and <code className="bg-zinc-800 text-white px-1 rounded">Firebase</code> for authentication and storage.
        </li>
        <li>
          <strong>UI/UX Design:</strong> Translating concepts into usable experiences with tools like <code className="bg-zinc-800 text-white px-1 rounded">Figma</code>, <code className="bg-zinc-800 text-white px-1 rounded">Framer</code>, and icon systems like <code className="bg-zinc-800 text-white px-1 rounded">Lucide</code>.
        </li>
        <li>
          <strong>Game Development (2D/3D):</strong> Exploring interactive design using <code className="bg-zinc-800 text-white px-1 rounded">Unreal Engine</code> and <code className="bg-zinc-800 text-white px-1 rounded">GDevelop</code>. I'm currently prototyping physics-based mechanics, shaders, and open-world concepts.
        </li>
        <li>
          <strong>AI & Prompt Engineering:</strong> Integrating AI workflows, utilizing LLMs, building intelligent assistants, and using automation tools to enhance dev productivity.
        </li>
      </ul>

      <p>🎯 <strong>Vision & Goals:</strong></p>
      <p>
        I’m not just building apps — I’m building scalable, sustainable ecosystems that solve real problems. I dream of the day I roll out in a custom <strong>AMG G63</strong>, fully earned through code, late nights, and unshakable ambition.
      </p>

      <p className="text-pink-500 font-medium">
        🧠 Core Values: Consistency -- Motivation | Execution -- Ideas | Learning in Public -- Waiting for Perfection
      </p>
    </div>
  );
};

export default AboutSection;
