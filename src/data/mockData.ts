import type { Tramite, Categoria, Organizacion } from '../types';

export const mockOrganizaciones: Organizacion[] = [
  {
    _id: 'org-dnic',
    nombre: 'Dirección Nacional de Identificación Civil (DNIC)',
    siglas: 'DNIC',
    sitioWeb: 'https://dnic.minterior.gub.uy',
    descripcion: 'Organismo del Ministerio del Interior responsable de la expedición y control de la Cédula de Identidad y Pasaportes en Uruguay.',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
    contacto: {
      telefono: '2030 3740',
      email: 'consultas@dnic.gub.uy',
      horarioGeneral: 'Lunes a Viernes de 08:00 a 15:00'
    },
    sedes: [
      {
        _id: 'sede-dnic-1',
        nombreSede: 'Oficina DNIC Paysandú',
        direccion: 'Montecaseros 1145 entre Sarandí y Florida, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3162,-58.0818',
        horario: 'Lunes a Viernes de 08:00 a 15:00',
        telefono: '2030 3740'
      }
    ],
    activo: true
  },
  {
    _id: 'org-dds',
    nombre: 'Dirección Departamental de Salud de Paysandú (MSP)',
    siglas: 'DDS',
    sitioWeb: 'https://www.gub.uy/ministerio-salud-publica',
    descripcion: 'Autoridad sanitaria departamental reguladora y prestadora de servicios de salud preventiva y carné de salud en Paysandú.',
    contacto: {
      telefono: '4722 2555',
      email: 'ddspaysandu@msp.gub.uy',
      horarioGeneral: 'Lunes a Viernes de 07:30 a 14:00'
    },
    sedes: [
      {
        _id: 'sede-dds-1',
        nombreSede: 'Sede Central DDS / Policlínica Municipal',
        direccion: 'Montecaseros 1020, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3155,-58.0810',
        horario: '07:30 a 14:00',
        telefono: '4722 2555'
      }
    ],
    activo: true
  },
  {
    _id: 'org-bps',
    nombre: 'Banco de Previsión Social (Sucursal Paysandú)',
    siglas: 'BPS',
    sitioWeb: 'https://www.bps.gub.uy',
    descripcion: 'Instituto estatal de seguridad social en el Uruguay encargado del registro laboral, Fonasa y prestaciones.',
    contacto: {
      telefono: '1997',
      email: 'consultas@bps.gub.uy',
      horarioGeneral: 'Lunes a Viernes de 09:15 a 16:00'
    },
    sedes: [
      {
        _id: 'sede-bps-1',
        nombreSede: 'Sucursal Paysandú BPS',
        direccion: '18 de Julio 1044, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3168,-58.0775',
        horario: '09:15 a 16:00',
        telefono: '1997'
      }
    ],
    activo: true
  },
  {
    _id: 'org-idp',
    nombre: 'Intendencia Departamental de Paysandú',
    siglas: 'IDP',
    sitioWeb: 'https://www.paysandu.gub.uy',
    descripcion: 'Gobierno departamental responsable de la administración de servicios públicos, tránsito, cultura y juventud en Paysandú.',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=120&q=80',
    contacto: {
      telefono: '4722 6220',
      email: 'contacto@paysandu.gub.uy',
      horarioGeneral: 'Lunes a Viernes de 07:00 a 17:00'
    },
    sedes: [
      {
        _id: 'sede-idp-1',
        nombreSede: 'Palacio Municipal (Sede Central)',
        direccion: '18 de Julio y Zorrilla de San Martín, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3175,-58.0792',
        horario: '07:00 a 17:00',
        telefono: '4722 6220'
      },
      {
        _id: 'sede-idp-2',
        nombreSede: 'Dirección de Tránsito y Transporte',
        direccion: 'Zorrilla de San Martín 1234, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3180,-58.0805',
        horario: '07:00 a 16:00',
        telefono: '4722 6220 int. 140'
      }
    ],
    activo: true
  },
  {
    _id: 'org-fondo',
    nombre: 'Fondo de Solidaridad / Bienestar Estudiantil',
    siglas: 'Fondo Solidaridad',
    sitioWeb: 'https://becas.fondodesolidaridad.edu.uy',
    descripcion: 'Institución orientada a promover la equidad y permanencia de jóvenes terciarios y universitarios de todo el país.',
    contacto: {
      telefono: '2900 4030',
      email: 'becas@fondodesolidaridad.edu.uy',
      horarioGeneral: 'Lunes a Viernes de 09:00 a 17:00'
    },
    sedes: [
      {
        _id: 'sede-cenur-1',
        nombreSede: 'CENUR Litoral Norte - Sede Paysandú (UDELAR)',
        direccion: 'Florida 1065, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3150,-58.0825',
        horario: '08:00 a 20:00',
        telefono: '4722 0221'
      }
    ],
    activo: true
  }
];

export const mockCategorias: Categoria[] = [
  {
    _id: 'cat-vida-ciudadana',
    nombre: 'Vida ciudadana',
    slug: 'vida-ciudadana',
    descripcion: 'Cédula de identidad, boleto estudiantil, credencial cívica y trámites de identidad.',
    icono: 'ShieldCheck',
    color: '#0D47A1',
    orden: 1,
    activo: true,
    totalTramites: 3
  },
  {
    _id: 'cat-salud',
    nombre: 'Salud',
    slug: 'salud',
    descripcion: 'Carné de salud básico y laboral, policlínicas barriales, vacunatorios y chequeos.',
    icono: 'HeartPulse',
    color: '#00897B',
    orden: 2,
    activo: true,
    totalTramites: 2
  },
  {
    _id: 'cat-trabajo',
    nombre: 'Trabajo',
    slug: 'trabajo',
    descripcion: 'Inscripción en BPS, primer empleo, registro de emprendedores jóvenes y orientación laboral.',
    icono: 'Briefcase',
    color: '#D97706',
    orden: 3,
    activo: true,
    totalTramites: 2
  },
  {
    _id: 'cat-educacion',
    nombre: 'Educación y Becas',
    slug: 'educacion-y-becas',
    descripcion: 'Becas económicas del Fondo de Solidaridad, pasantías, becas Butiá y apoyos de estudio.',
    icono: 'GraduationCap',
    color: '#2563EB',
    orden: 4,
    activo: true,
    totalTramites: 2
  },
  {
    _id: 'cat-transito',
    nombre: 'Tránsito y Transporte',
    slug: 'transito-y-transporte',
    descripcion: 'Primera libreta de conducir para jóvenes, motos, automóviles y seguridad vial.',
    icono: 'Car',
    color: '#0284c7',
    orden: 5,
    activo: true,
    totalTramites: 2
  }
];

export const mockTramites: Tramite[] = [
  {
    _id: 't-cedula',
    titulo: 'Cédula de Identidad (Primera vez y Renovación)',
    slug: 'cedula-de-identidad',
    descripcion: 'Obtención y renovación obligatoria del documento de identidad uruguayo en la oficina departamental de Identificación Civil de Paysandú.',
    organismo: mockOrganizaciones[0],
    categoria: mockCategorias[0],
    activo: true,
    destacado: true,
    modalidad: 'Mixto',
    costo: {
      tipo: 'Con Costo',
      monto: '$ 450 (Común) / $ 900 (Urgente)',
      detalles: 'La primera cédula para menores de edad es gratuita. Las renovaciones se abonan en Abitab, RedPagos o web oficial.'
    },
    tiempoEstimado: '15 minutos de atención presencial',
    dirigidoA: 'Ciudadanos uruguayos y residentes legales a partir de los 18 años (o menores acompañados por tutores).',
    urlAgenda: 'https://www.gub.uy/tramites/documento-nacional-identidad-renovacion-personas-ciudadanas-naturales-uruguayas',
    urlTramiteOnline: 'https://www.gub.uy/tramites/documento-nacional-identidad-renovacion-personas-ciudadanas-naturales-uruguayas',
    lugaresAtencion: [
      {
        _id: 'l-dnic-1',
        nombreLugar: 'Oficina DNIC Paysandú',
        direccion: 'Montecaseros 1145 entre Sarandí y Florida, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3162,-58.0818',
        horario: 'Lunes a Viernes de 08:00 a 15:00'
      }
    ],
    requisitos: [
      { _id: 'r-1', descripcion: 'Haber reservado cita previa en la Agenda Web oficial o en red de cobranza.', esObligatorio: true, orden: 1 },
      { _id: 'r-2', descripcion: 'Cédula de Identidad anterior (en caso de renovación).', esObligatorio: true, orden: 2 },
      { _id: 'r-3', descripcion: 'En caso de primera vez: Partida de Nacimiento expedida por Registro Civil (menor a 30 días).', esObligatorio: false, orden: 3 },
      { _id: 'r-4', descripcion: 'En caso de hurto o extravío: constancia de denuncia policial de la seccional.', esObligatorio: false, orden: 4 }
    ],
    documentacion: [
      {
        _id: 'd-1',
        nombreDocumento: 'Cédula vencida o deteriorada',
        descripcion: 'Documento físico original a renovar.',
        formatoPermitido: 'Original',
        esObligatorio: true
      },
      {
        _id: 'd-2',
        nombreDocumento: 'Comprobante de turno y pago',
        descripcion: 'Ticket de Abitab/RedPagos o confirmación digital en el celular.',
        formatoPermitido: 'Digital o Impreso',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-1',
        numeroPaso: 1,
        tituloPaso: 'Agendate en línea',
        descripcionPaso: 'Ingresá al portal oficial de la DNIC o acércate a cualquier red de cobranza con tu número de cédula para reservar fecha y hora.'
      },
      {
        _id: 'p-2',
        numeroPaso: 2,
        tituloPaso: 'Aboná el arancel correspondiente',
        descripcionPaso: 'Si el trámite es con costo, abona el arancel común o urgente antes de la fecha elegida.'
      },
      {
        _id: 'p-3',
        numeroPaso: 3,
        tituloPaso: 'Presentate en la oficina de Montecaseros',
        descripcionPaso: 'Llegá 10 minutos antes a la sede DNIC Paysandú para la captura digital de huellas dactilares, firma y fotografía.'
      },
      {
        _id: 'p-4',
        numeroPaso: 4,
        tituloPaso: 'Entrega del documento',
        descripcionPaso: 'En la modalidad común te llevás el nuevo documento con chip en mano en el mismo momento.'
      }
    ],
    videos: [
      {
        _id: 'v-1',
        titulo: 'Cédula de identidad (trámite en línea)',
        urlVideo: 'https://www.youtube.com/watch?v=NALqFcXNiz4'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-1',
        pregunta: '¿Puedo renovar si se me venció hace meses o años?',
        respuesta: 'Sí, podés renovarla sin penalización alguna. Solo debés concurrir con el documento vencido y turno agendado.'
      },
      {
        _id: 'faq-2',
        pregunta: '¿Cuánto dura la cédula para mayores de 18 años?',
        respuesta: 'Para personas de 18 años en adelante tiene una vigencia legal de 10 años continuos.'
      },
      {
        _id: 'faq-3',
        pregunta: '¿Puedo sacarla de urgencia en el día?',
        respuesta: 'Sí, la agenda oficial cuenta con cupos urgentes diarios con un costo diferenciado abonable al instante.'
      }
    ],
    palabrasClave: ['cedula', 'identidad', 'dnic', 'renovacion', 'primera vez', 'documento', 'chip', '18 años']
  },
  {
    _id: 't-salud',
    titulo: 'Carné de Salud Laboral y Estudiantil',
    slug: 'carne-de-salud',
    descripcion: 'Chequeo médico preventivo obligatorio en Paysandú para ingresar a trabajar, realizar pasantías formativas o iniciar carreras universitarias y terciarias.',
    organismo: mockOrganizaciones[1],
    categoria: mockCategorias[1],
    activo: true,
    destacado: true,
    modalidad: 'Presencial',
    costo: {
      tipo: 'Con Costo',
      monto: '$ 450 en Policlínica Municipal',
      detalles: 'Estudiantes de UTU, UTEC o Liceo pueden acceder a tarifa bonificada o gratuita presentando constancia de estudio activa.'
    },
    tiempoEstimado: 'Atención en la mañana, entrega en 24 a 48 hs',
    dirigidoA: 'Jóvenes de 18 a 25 años que ingresan a un empleo formal o cursan estudios superiores.',
    urlAgenda: 'https://www.gub.uy/tramites/carne-salud',
    urlTramiteOnline: 'https://www.gub.uy/tramites/carne-salud',
    lugaresAtencion: [
      {
        _id: 'l-dds-1',
        nombreLugar: 'Dirección Departamental de Salud (MSP) / Policlínica',
        direccion: 'Montecaseros 1020, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3155,-58.0810',
        horario: 'Lunes a Viernes de 07:30 a 13:00'
      }
    ],
    requisitos: [
      { _id: 'r-s1', descripcion: 'Cédula de Identidad uruguaya vigente y en buen estado.', esObligatorio: true, orden: 1 },
      { _id: 'r-s2', descripcion: 'Ayuno mínimo de 8 horas para extracción de sangre y muestra de orina matinal.', esObligatorio: true, orden: 2 },
      { _id: 'r-s3', descripcion: 'Certificado de Vacuna Antitetánica vigente (o carné de vacunas en mano).', esObligatorio: true, orden: 3 },
      { _id: 'r-s4', descripcion: 'Constancia de estudiante terciario/secundario si aplica para bonificación.', esObligatorio: false, orden: 4 }
    ],
    documentacion: [
      {
        _id: 'd-s1',
        nombreDocumento: 'Cédula de Identidad',
        descripcion: 'Documento original.',
        formatoPermitido: 'Original',
        esObligatorio: true
      },
      {
        _id: 'd-s2',
        nombreDocumento: 'Carné de Vacunas',
        descripcion: 'Comprobante sellado que acredite antitetánica al día.',
        formatoPermitido: 'Original',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-s1',
        numeroPaso: 1,
        tituloPaso: 'Ayuno y extracción',
        descripcionPaso: 'Concurrir entre 07:30 y 09:00 en ayunas para la toma de muestras de laboratorio de sangre y orina.'
      },
      {
        _id: 'p-s2',
        numeroPaso: 2,
        tituloPaso: 'Examen clínico, visual y odontológico',
        descripcionPaso: 'Control de agudeza visual, presión arterial, peso, talla y chequeo de salud bucal.'
      },
      {
        _id: 'p-s3',
        numeroPaso: 3,
        tituloPaso: 'Retiro del Carné',
        descripcionPaso: 'Retiro del carné plastificado con certificación de aptitud y vigencia otorgada.'
      }
    ],
    videos: [
      {
        _id: 'v-s1',
        titulo: 'Carné de Salud en Uruguay: Requisitos y Exámenes',
        urlVideo: 'https://www.youtube.com/watch?v=j3EdiIcGTSE'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-s1',
        pregunta: '¿Qué vigencia tiene el carné?',
        respuesta: 'Generalmente se expide por 2 años. Si algún parámetro requiere control posterior, el médico tratante puede otorgarlo por 6 meses provisorios.'
      },
      {
        _id: 'faq-s2',
        pregunta: '¿Tengo que vacunarme de nuevo si perdí mi carné de vacunas?',
        respuesta: 'No necesariamente. En el vacunatorio de la policlínica pueden consultar el Registro Informático Nacional de Vacunas (RINV) con tu cédula.'
      }
    ],
    palabrasClave: ['carne de salud', 'salud', 'medico', 'estudiante', 'trabajo', 'clinico', 'sangre', 'orina', 'vacunas']
  },
  {
    _id: 't-bps',
    titulo: 'Inscripción Laboral y Alta en BPS (Primer Trabajo)',
    slug: 'inscripcion-laboral-bps',
    descripcion: 'Guía oficial para jóvenes que inician su actividad laboral formal: verificación de aportes jubilatorios, cobertura médica Fonasa y asignaciones familiares.',
    organismo: mockOrganizaciones[2],
    categoria: mockCategorias[2],
    activo: true,
    destacado: true,
    modalidad: 'En Línea',
    costo: {
      tipo: 'Gratuito',
      monto: '$ 0',
      detalles: 'El trámite de registro, creación de usuario y consulta de historia laboral es completamente gratuito.'
    },
    tiempoEstimado: '10 minutos en línea',
    dirigidoA: 'Jóvenes que ingresan a su primer empleo dependiente, becarios o contratados en Paysandú.',
    urlAgenda: 'https://www.bps.gub.uy',
    urlTramiteOnline: 'https://www.gub.uy/tramites/constancia-historia-laboral-nominada',
    lugaresAtencion: [
      {
        _id: 'l-bps-1',
        nombreLugar: 'Sucursal Paysandú BPS',
        direccion: '18 de Julio 1044, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3168,-58.0775',
        horario: 'Lunes a Viernes de 09:15 a 16:00'
      }
    ],
    requisitos: [
      { _id: 'r-b1', descripcion: 'Cédula de Identidad uruguaya vigente.', esObligatorio: true, orden: 1 },
      { _id: 'r-b2', descripcion: 'Usuario personal de BPS o Identidad Digital Gub.uy activa.', esObligatorio: true, orden: 2 },
      { _id: 'r-b3', descripcion: 'Haber sido dado de alta por la empresa o contratante en el sistema GAFI de BPS.', esObligatorio: true, orden: 3 }
    ],
    documentacion: [
      {
        _id: 'd-b1',
        nombreDocumento: 'Documento de Identidad',
        descripcion: 'Cédula para verificar identidad presencial si requerís crear usuario gub.uy.',
        formatoPermitido: 'Original',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-b1',
        numeroPaso: 1,
        tituloPaso: 'Activá tu Usuario Gub.uy / BPS',
        descripcionPaso: 'Crea tu cuenta digital en gub.uy con tu cédula o en cualquier local de Abitab/RedPagos/BPS en minutos.'
      },
      {
        _id: 'p-b2',
        numeroPaso: 2,
        tituloPaso: 'Verificá tu alta en Servicios en Línea',
        descripcionPaso: 'Ingresá al portal "Mi BPS" y corroborá que tu empleador haya registrado tu ingreso en fecha y con la categoría correcta.'
      },
      {
        _id: 'p-b3',
        numeroPaso: 3,
        tituloPaso: 'Elegí tu prestador de salud (FONASA)',
        descripcionPaso: 'Tras el alta tenés derecho a mutualista privada o ASSE con cobertura integral a tu cargo.'
      }
    ],
    videos: [
      {
        _id: 'v-b1',
        titulo: 'Usuario Personal BPS y Servicios en Línea',
        urlVideo: 'https://www.youtube.com/watch?v=4JLvFKEG3PY'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-b1',
        pregunta: '¿Tengo que hacer algún trámite si mi empleador ya me dio de alta?',
        respuesta: 'El empleador hace el alta, pero vos debés ingresar a BPS para elegir tu prestador médico (Fonasa) y corroborar tu historia laboral.'
      },
      {
        _id: 'faq-b2',
        pregunta: '¿A partir de qué fecha tengo cobertura médica?',
        respuesta: 'La cobertura médica por Fonasa rige desde el primer día laboral formal registrado.'
      }
    ],
    palabrasClave: ['bps', 'trabajo', 'alta laboral', 'primer empleo', 'fonasa', 'seguridad social', 'contrato', 'historia laboral']
  },
  {
    _id: 't-beca',
    titulo: 'Beca Estudiantil Terciaria (Fondo de Solidaridad)',
    slug: 'beca-estudiantil-terciaria',
    descripcion: 'Apoyo económico mensual de 2 BPC para jóvenes de Paysandú que cursan carreras en UDELAR (CENUR Litoral Norte), UTEC o DGETP-UTU.',
    organismo: mockOrganizaciones[4],
    categoria: mockCategorias[3],
    activo: true,
    destacado: true,
    modalidad: 'En Línea',
    costo: {
      tipo: 'Gratuito',
      monto: '$ 0',
      detalles: 'La postulación y acompañamiento del Fondo de Solidaridad no tiene costo alguno.'
    },
    tiempoEstimado: 'Postulación anual (Noviembre a Febrero)',
    dirigidoA: 'Estudiantes terciarios con situación socioeconómica vulnerable que necesiten apoyo para continuar sus estudios.',
    urlTramiteOnline: 'https://becas.fondodesolidaridad.edu.uy',
    lugaresAtencion: [
      {
        _id: 'l-cenur-1',
        nombreLugar: 'CENUR Litoral Norte - Sede Paysandú (UDELAR)',
        direccion: 'Florida 1065, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3150,-58.0825',
        horario: 'Lunes a Viernes de 08:00 a 20:00'
      }
    ],
    requisitos: [
      { _id: 'r-be1', descripcion: 'Estar inscripto en una carrera técnica, de grado o terciaria en UDELAR, UTEC o UTU.', esObligatorio: true, orden: 1 },
      { _id: 'r-be2', descripcion: 'Pertenecer a un hogar con ingresos per cápita acordes al baremo de vulnerabilidad.', esObligatorio: true, orden: 2 },
      { _id: 'r-be3', descripcion: 'Completar el formulario de declaración jurada socioeconómica en línea.', esObligatorio: true, orden: 3 },
      { _id: 'r-be4', descripcion: 'Para renovantes: haber superado el 50% de los créditos anuales requeridos.', esObligatorio: false, orden: 4 }
    ],
    documentacion: [
      {
        _id: 'd-be1',
        nombreDocumento: 'Comprobantes de ingresos del núcleo familiar',
        descripcion: 'Recibos de sueldo, pasividades o declaración jurada de ingresos informales.',
        formatoPermitido: 'PDF o JPG legible',
        esObligatorio: true
      },
      {
        _id: 'd-be2',
        nombreDocumento: 'Constancia de inscripción o escolaridad',
        descripcion: 'Emitida por la bedelía correspondiente del CENUR o UTEC.',
        formatoPermitido: 'PDF digital',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-be1',
        numeroPaso: 1,
        tituloPaso: 'Creá tu usuario en el Portal del Fondo',
        descripcionPaso: 'Ingresá a la plataforma con tu cédula y correo electrónico personal.'
      },
      {
        _id: 'p-be2',
        numeroPaso: 2,
        tituloPaso: 'Completá la solicitud socioeconómica',
        descripcionPaso: 'Carga los datos familiares, vivienda e ingresos adjuntando la documentación digital.'
      },
      {
        _id: 'p-be3',
        numeroPaso: 3,
        tituloPaso: 'Evaluación y cobro mensual',
        descripcionPaso: 'Una vez asignada, la beca se deposita mensualmente en una cuenta bancaria a tu nombre.'
      }
    ],
    videos: [
      {
        _id: 'v-be1',
        titulo: 'Tutorial solicitud de la Beca Fondo de Solidaridad',
        urlVideo: 'https://www.youtube.com/watch?v=8JmEjd3ouA0'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-be1',
        pregunta: '¿Cuál es el monto mensual de la beca?',
        respuesta: 'Equivale a 2 BPC (Bases de Prestaciones y Contribuciones), aproximadamente $ 12.000 mensuales durante el ciclo lectivo.'
      },
      {
        _id: 'faq-be2',
        pregunta: '¿Puedo solicitarla si vivo en Paysandú y estudio en CENUR Paysandú?',
        respuesta: 'Sí, las becas se otorgan a estudiantes locales y a quienes deban trasladarse dentro de la región.'
      }
    ],
    palabrasClave: ['beca', 'fondo de solidaridad', 'estudiantil', 'universidad', 'utec', 'udelar', 'cenur', 'apoyo economico']
  },
  {
    _id: 't-boleto',
    titulo: 'Boleto Estudiantil Gratuito / Abono Joven Paysandú',
    slug: 'boleto-estudiantil',
    descripcion: 'Pase libre y abono subsidiado de transporte urbano para estudiantes de educación media, UTU, UTEC y UDELAR residentes en Paysandú.',
    organismo: mockOrganizaciones[3],
    categoria: mockCategorias[0],
    activo: true,
    destacado: true,
    modalidad: 'Presencial',
    costo: {
      tipo: 'Gratuito',
      monto: '$ 0',
      detalles: 'El beneficio del boleto gratuito está financiado al 100% por la Intendencia y subsidio nacional.'
    },
    tiempoEstimado: '15 minutos (retiro en el acto)',
    dirigidoA: 'Estudiantes de hasta 25 años matriculados en centros de estudio formales de Paysandú.',
    lugaresAtencion: [
      {
        _id: 'l-tra-1',
        nombreLugar: 'Dirección de Tránsito y Transporte IDP',
        direccion: 'Zorrilla de San Martín 1234, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3180,-58.0805',
        horario: 'Lunes a Viernes de 07:00 a 16:00'
      }
    ],
    requisitos: [
      { _id: 'r-bo1', descripcion: 'Cédula de Identidad original y vigente.', esObligatorio: true, orden: 1 },
      { _id: 'r-bo2', descripcion: 'Constancia oficial de estudiante emitida por el liceo, escuela técnica, UTEC o UDELAR.', esObligatorio: true, orden: 2 },
      { _id: 'r-bo3', descripcion: 'Foto carné reciente (o captura en ventanilla).', esObligatorio: false, orden: 3 }
    ],
    documentacion: [
      {
        _id: 'd-bo1',
        nombreDocumento: 'Constancia de Estudios de Bedelía',
        descripcion: 'Certificado firmado y sellado o con código QR de verificación.',
        formatoPermitido: 'Original',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-bo1',
        numeroPaso: 1,
        tituloPaso: 'Solicitá tu constancia en el centro educativo',
        descripcionPaso: 'Pide en bedelía la constancia oficial para boleto estudiantil.'
      },
      {
        _id: 'p-bo2',
        numeroPaso: 2,
        tituloPaso: 'Presentate en Dirección de Tránsito',
        descripcionPaso: 'Llevá tu constancia y cédula a Zorrilla de San Martín 1234.'
      },
      {
        _id: 'p-bo3',
        numeroPaso: 3,
        tituloPaso: 'Entrega de tu tarjeta magnética',
        descripcionPaso: 'Se te carga el paquete de hasta 50 boletos mensuales para los colectivos locales.'
      }
    ],
    videos: [
      {
        _id: 'v-bo1',
        titulo: 'Trámites de Tránsito y Transporte en Paysandú',
        urlVideo: 'https://www.youtube.com/watch?v=lqMQwTwQEPk'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-bo1',
        pregunta: '¿Cuántos viajes incluye por mes?',
        respuesta: 'Incluye hasta 50 viajes mensuales válidos en todas las líneas de transporte urbano de Paysandú.'
      }
    ],
    palabrasClave: ['boleto', 'transporte', 'estudiante', 'omnibus', 'abono', 'colectivo', 'idp', 'pase libre']
  },
  {
    _id: 't-primera-libreta',
    titulo: 'Solicitud de Primera Libreta de Conducir (Categoría A)',
    slug: 'primera-libreta-conducir-cat-a',
    descripcion: 'Procedimiento para jóvenes que deseen obtener por primera vez la licencia de conducir automóviles particulares y utilitarios en Paysandú.',
    organismo: mockOrganizaciones[3],
    categoria: mockCategorias[4],
    activo: true,
    destacado: true,
    modalidad: 'Presencial',
    costo: {
      tipo: 'Con Costo',
      monto: '$ 2.150',
      detalles: 'Incluye derecho a examen teórico y práctico en la pista de tránsito.'
    },
    tiempoEstimado: '1 a 3 semanas (según coordinación de clases de academia y exámenes)',
    dirigidoA: 'Personas a partir de 18 años cumplidos radicadas en Paysandú.',
    urlAgenda: 'https://www.paysandu.gub.uy',
    lugaresAtencion: [
      {
        _id: 'l-tra-2',
        nombreLugar: 'Dirección de Tránsito y Transporte',
        direccion: 'Zorrilla de San Martín 1234, Paysandú',
        mapsUrl: 'https://maps.google.com/?q=-32.3180,-58.0805',
        horario: 'Lunes a Viernes de 07:00 a 16:00'
      }
    ],
    requisitos: [
      { _id: 'r-l1', descripcion: 'Tener 18 años cumplidos al momento de rendir los exámenes.', esObligatorio: true, orden: 1 },
      { _id: 'r-l2', descripcion: 'Cédula de Identidad uruguaya vigente y sin multas pendientes.', esObligatorio: true, orden: 2 },
      { _id: 'r-l3', descripcion: 'Constancia de domicilio en el departamento de Paysandú.', esObligatorio: true, orden: 3 },
      { _id: 'r-l4', descripcion: 'Certificado médico de aptitud psicofísica emitido por institución autorizada.', esObligatorio: true, orden: 4 }
    ],
    documentacion: [
      {
        _id: 'd-l1',
        nombreDocumento: 'Cédula de Identidad vigente',
        descripcion: 'Original y fotocopia legible.',
        formatoPermitido: 'Original y Fotocopia',
        esObligatorio: true
      }
    ],
    pasos: [
      {
        _id: 'p-l1',
        numeroPaso: 1,
        tituloPaso: 'Inscripción y Examen Médico',
        descripcionPaso: 'Realizar el chequeo de aptitud psicofísica y presentar la carpeta en la Dirección de Tránsito.'
      },
      {
        _id: 'p-l2',
        numeroPaso: 2,
        tituloPaso: 'Examen Teórico',
        descripcionPaso: 'Rendir la prueba teórica interactiva sobre normas nacionales de tránsito y seguridad vial.'
      },
      {
        _id: 'p-l3',
        numeroPaso: 3,
        tituloPaso: 'Examen Práctico de Conducción',
        descripcionPaso: 'Demostrar destreza en pista cerrada y circulación guiada por inspectores de tránsito.'
      },
      {
        _id: 'p-l4',
        numeroPaso: 4,
        tituloPaso: 'Emisión y Entrega de Libreta',
        descripcionPaso: 'Superados los exámenes, se toma la foto digital y se entrega el carné de conductor.'
      }
    ],
    videos: [
      {
        _id: 'v-l1',
        titulo: 'Tramitar licencias de conducir fácil y rápido - Intendencia de Paysandú',
        urlVideo: 'https://www.youtube.com/watch?v=ddeCuibHqL4'
      }
    ],
    preguntasFrecuentes: [
      {
        _id: 'faq-l1',
        pregunta: '¿Cuántas clases de academia son obligatorias?',
        respuesta: 'Se requiere certificar un mínimo de 15 clases prácticas en academia habilitada o tutor autorizado.'
      }
    ],
    palabrasClave: ['primera libreta', 'aprender a manejar', 'licencia', 'auto', 'categoria a', 'examen teorico', 'transito']
  }
];
