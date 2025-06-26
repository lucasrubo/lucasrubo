const profile = {
  name: 'Lucas Gabriel Rubo',
  title: 'Web developer',
  avatar: './images/avatar.jpg',
  email: 'lucasrubo1@gmail.com',
  phone: '+55 (19) 9940-19804',
  birthday: '2000-07-12',
  birthdayText: 'July 12, 2000',
  location: 'Valinhos, São Paulo, Brazil',

  about: {
    title: 'About me',
    paragraphs: [
      `I am 24 years old and hold a degree in Computer Science from Universidade Paulista.`,
      `Currently, I work as a developer at Areco, where I specialize in front-end development for the ERP Web system using Blazor. Additionally, I contribute to building supplementary systems with Blazor and Delphi, ensuring seamless integration and performance. My passion lies in front-end development, where I enjoy crafting intuitive, responsive user interfaces that enhance usability and efficiency. Beyond Blazor, I also have experience with React and TypeScript, which I actively use in personal and professional projects to stay at the forefront of modern web development.`,
      `Previously, I worked as a Junior Developer at NB41 Comunicação e Marketing LTDA, where I developed and customized PHP-based systems, designed layouts, and managed databases. Before that, I interned as a Systems Developer at IBM in the CI/CD team, focusing on test automation, Jenkins pipeline creation, and scripting (Docker, Git) to streamline deployment processes.`,
      `I am deeply passionate about front-end technologies, particularly React and TypeScript, and continuously seek to expand my expertise in modern frameworks and best practices. Additionally, I have experience with back-end languages like Java, Python, and C++, as well as database systems such as MySQL and PostgreSQL.`,
      `A strong believer in lifelong learning, I thrive in dynamic environments where I can apply my problem-solving skills and adaptability to deliver high-quality solutions. Whether working on complex systems or experimenting with new technologies, I am always eager to grow and contribute to impactful projects.`,
    ],
  },

  services: [
    {
      icon: './images/icon-design.svg',
      title: 'Front-End Development',
      description: 'Modern web apps with React, TypeScript, Blazor – fast, scalable, user-friendly.',
    },
    {
      icon: './images/icon-dev.svg',
      title: 'Web development',
      description: 'End-to-end solutions: APIs, databases, and dynamic interfaces.',
    },
    {
      icon: './images/icon-app.svg',
      title: 'Cross-Platform Applications',
      description: 'iOS, Android & web apps with native performance.',
    }
  ],
};

export default profile;
