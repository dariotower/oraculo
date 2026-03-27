import { useMemo, useState } from 'react'

export default function App() {
  const cartas = useMemo(
    () => [
      {
        numero: 1,
        romano: 'I',
        titulo: 'ALQUIMISTA',
        imagen: '/carta-alquimista.jpg',
        explicacion:
          'Representa la mirada que guía la experiencia: observar, interpretar y transformar cada decisión del filtrado en una búsqueda consciente.',
      },
      {
        numero: 2,
        romano: 'II',
        titulo: 'EL CAFÉ',
        imagen: '/carta-cafe.jpg',
        explicacion:
          'Es el origen de todo. Variedad, tueste, frescura y conservación afectan de manera directa el resultado final en la taza.',
      },
      {
        numero: 3,
        romano: 'III',
        titulo: 'EL MÉTODO',
        imagen: '/carta-metodo.jpg',
        explicacion:
          'Cada método propone una forma distinta de extraer: cambia el cuerpo, la claridad y la manera en que percibimos el café.',
      },
      ...Array.from({ length: 9 }, (_, i) => ({
        numero: i + 4,
        romano: ['IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][i],
        titulo: `Carta ${i + 4}`,
        imagen: null,
        explicacion:
          'Próximamente se sumará la ilustración final de esta carta. Por ahora este espacio funciona como estructura lista para completar.',
      })),
    ],
    [],
  )

  const [abiertas, setAbiertas] = useState({})

  const toggleCarta = (numero) => {
    setAbiertas((prev) => ({ ...prev, [numero]: !prev[numero] }))
  }

  return (
    <main className="app">
      <div className="bg-effects" aria-hidden="true">
        {Array.from({ length: 44 }).map((_, i) => (
          <span
            key={i}
            className="spark"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              opacity: 0.55,
            }}
          />
        ))}
      </div>

      <section className="container">
        <header className="header">
          <h1>EPIFANÍA DEL CAFÉ</h1>
          <div className="rule" />
        </header>

        <div className="grid">
          {cartas.map((carta) => {
            const abierta = !!abiertas[carta.numero]

            return (
              <article key={carta.numero} className="card-wrap">
                <div className="roman">{carta.romano}</div>

                <button
                  type="button"
                  onClick={() => toggleCarta(carta.numero)}
                  className="card-button"
                  aria-pressed={abierta}
                  aria-label={`Revelar ${carta.titulo}`}
                >
                  <div
                    className={`flip-card ${abierta ? 'is-open' : ''}`}
                  >
                    <div className="card-face card-back">
                      <img src="/dorso.jpg" alt={`Dorso de la carta ${carta.romano}`} />
                    </div>

                    <div className="card-face card-front">
                      {carta.imagen ? (
                        <img src={carta.imagen} alt={carta.titulo} />
                      ) : (
                        <div className="placeholder">
                          <div className="placeholder-title">{carta.titulo}</div>
                          <p>Ilustración en desarrollo</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                <div className={`desc ${abierta ? 'visible' : ''}`}>
                  <p>{carta.explicacion}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
