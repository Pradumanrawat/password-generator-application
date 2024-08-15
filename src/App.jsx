import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [noallowed, setnoallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("")

  const passwordgen = useCallback(() => {//optimize way se hmm sare dependendcies ko ek fun se run ki khoshish krege
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noallowed) {

      str = str + "0123456789";

    }

    if (charallowed) {
      str = str + "@#$%^&*()!`~"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)

      pass += str.charAt(char);

    }
    setpassword(pass);

  }, [length, noallowed, charallowed])//optimized  these are dependences

  useEffect(() => {
    passwordgen()//fun run
  }, [length, noallowed, charallowed, passwordgen])//agar something change than dependencies run


  /* const copyToClipboard = () => {
     navigator.clipboard.writeText(password);
     alert("Password copied to clipboard!");
   };*/
  const passref = useRef(null)
  const copyToClipboard = useCallback(() => {
    passref.current?.select()
    // passref.current?.setSelectionRange(0, 3)//selection range(usecase)
    window.navigator.clipboard.writeText(password)
  }, [password])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 text-orange-400 rounded-md' >
        <h1 className='text-white text-center m-11 font-bold   '>PASSWORD  GENERATOR</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            className='outline-none w-full py-1 px-3'
            value={password}
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button className='outline-none bg-blue-300 m-3 rounded-md' onClick={copyToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={60}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value)

              }}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              Checked={charallowed}
              id='characterinput'
              onChange={() => {
                setcharallowed((prev) =>
                  !prev)
              }}
            />
            <label >characters</label>
          </div >
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              checked={noallowed}
              onChange={() => {
                setnoallowed((p) =>
            !p
            )
              }}

            />
            <label >numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
