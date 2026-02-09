import { Heart, Globe, BookOpen, Users, Accessibility, Smartphone } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: 'Lectura digital',
      description: 'Libros interactivos diseñados para leer en cualquier dispositivo.',
      color: 'bg-blue-50 text-unicef',
    },
    {
      icon: Accessibility,
      title: 'Accesibles',
      description: 'Diseñados con estándares de accesibilidad para todos los niños y niñas.',
      color: 'bg-green-50 text-accent-mint',
    },
    {
      icon: Smartphone,
      title: 'Descarga gratis',
      description: 'Disponibles para descargar en Android y Windows, totalmente gratis.',
      color: 'bg-orange-50 text-accent-orange',
    },
    {
      icon: Users,
      title: 'Para todos',
      description: 'Historias que celebran la diversidad cultural de Colombia.',
      color: 'bg-purple-50 text-accent-purple',
    },
    {
      icon: Globe,
      title: 'En español',
      description: 'Contenido en español adaptado para la infancia colombiana.',
      color: 'bg-pink-50 text-accent-pink',
    },
    {
      icon: Heart,
      title: 'Con amor',
      description: 'Cada libro es creado con el compromiso de UNICEF por la infancia.',
      color: 'bg-red-50 text-accent-coral',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-unicef-light/40 decoration-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent-coral/15 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Heart size={16} />
            Sobre el proyecto
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-800">
            Para cada infancia,{' '}
            <span className="text-unicef">un libro</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            UNICEF Colombia promueve el acceso a la lectura como derecho fundamental
            de todos los niños y niñas. Estos libros digitales son parte de ese compromiso.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-unicef/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={22} />
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
