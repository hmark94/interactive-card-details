import React, { useState } from 'react'
import bgMobile from './images/bg-main-mobile.png'
import bgDesktop from './images/bg-main-desktop.png'
import logo from './images/card-logo.svg'
import tick from './images/icon-complete.svg'

export default function App() {
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [dateMonth, setDateMonth] = useState('')
  const [dateYear, setDateYear] = useState('')
  const [cvc, setCvc] = useState('')

  return (
    <>
      <section>
        <div className='absolute -z-10 w-full'>
          <picture>
            <source media='(min-width: 768px)' srcSet={bgDesktop} />
            <img src={bgMobile} alt='background' className='w-full md:w-1/3' />
          </picture>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto'>
          <div className='mt-10 mx-5 lg:grid lg:grid-cols-1'>
            <article className='front-card p-5 flex flex-col justify-between'>
              <img src={logo} alt='' className='w-20 lg:w-28' />

              <div>
                <h2 className='text-white text-xl mb-6 lg:text-3xl tracking-widest'>
                  {cardNumber
                    .replace(/\s/g, '')
                    .replace(/(\d{4})/g, '$1 ')
                    .trim()}
                </h2>

                <ul className='flex items-center justify-between'>
                  <li className='text-white uppercase text-base lg:text-xl tracking-widest'>
                    {name}
                  </li>
                  <li className='text-white text-base lg:text-xl tracking-widest'>
                    {`${dateMonth}/${dateYear}`}
                  </li>
                </ul>
              </div>
            </article>
            <article className='back-card relative lg:ml-20'>
              <p className='absolute right-6 lg:right-10 text-lg lg:text-xl text-white tracking-widest'>
                {cvc}
              </p>
            </article>
          </div>

          <div className='pt-8 px-5 pb-20'>
            {!confirmed && (
              <form className='flex flex-col justify-center gap-8 lg:h-screen max-w-lg'>
                <div>
                  <label htmlFor='cardholder_name'>Cardholder Name</label>
                  <input
                    type='text'
                    name='cardholder_name'
                    id='cardholder_name'
                    placeholder='e.g. John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='card_number'>Card Number</label>
                  <input
                    type='text'
                    pattern="[0-9]+"
                    title='Use only numbers'
                    name='card_number'
                    id='card_number'
                    placeholder='e.g. 1234 1234 1234 1234'
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>

                <article className='flex items-center justify-between gap-8'>
                  <div className='flex-1'>
                    <label htmlFor='expiry_date'>Exp. Date (MM/YY)</label>
                    <div className='flex'>
                      <input
                        type='number'
                        name='expiry_date'
                        id='expiry_date'
                        placeholder='MM'
                        max={12}
                        value={dateMonth}
                        onChange={(e) => setDateMonth(e.target.value)}
                        required
                      />
                      <input
                        type='number'
                        name='expiry_date'
                        id='expiry_date'
                        placeholder='YY'
                        max={99}
                        value={dateYear}
                        onChange={(e) => setDateYear(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className='flex-1'>
                    <label htmlFor='cvc_number'>CVC</label>
                    <input
                      type='number'
                      name='cvc_number'
                      id='cvc_number'
                      placeholder='e.g. 123'
                      maxLength={3}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                    />
                  </div>
                </article>

                <button
                  onClick={() => {
                    setConfirmed(true)
                  }}
                  type='submit'
                  className='submit-btn'
                >
                  Confirm
                </button>
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  )
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className='thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto'>
        <img src={tick} alt='' className='block mx-auto' />
        <h1 className='text-slate-800 text-3xl mb-6 uppercase text-center'>
          Thank You
        </h1>
        <p className='test-slate-400 text-center'>
          We've added your card details
        </p>
        <button
          onClick={() => {
            setConfirmed(false)
          }}
          className='submit-btn block mx-auto mt-10 w-full'
        >
          Continue
        </button>
      </div>
    </>
  )
}
