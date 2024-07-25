import { useCallback, useEffect, useRef, useState } from "react"

function App() {
     let [length, setlength] = useState(8);
     let [allownumber, setallownumber] = useState(false);
     let [allowsymbol, setallowsymbol] = useState(false);
     let [password, getpassword] = useState("");

     // PROGRAM FOR GENERATING THE RANDOM PASSWORDS

     // useEffect HOOK FOR UPDATING THE DATA AS SOON AS THE USER UPDATES IT AND MAKING SURE THAT NO MULTIPLE RE-RENDERINGS OCCUR
     useEffect(() => {
          let pass = "";
          let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          if (allownumber) str += "1234567890";
          if (allowsymbol) str += "!@#$%^&*()";
          for (let i = 1; i <= length; i++) {
               let val = Math.floor((Math.random() * str.length) + 1);
               pass += str.charAt(val);
          }
          getpassword(pass);
     }, [length, allownumber, allowsymbol]);


     // USE OF useRef HOOK TO CREATE A REFERENCE OF AN ELEMENT AND TO USE IT FURTHER TO MAKE THE PROGRAM MORE OPTIMISED AND USER FRIENDLY
     const create_ref = useRef(null);

     const copy_password = useCallback(() => {
          create_ref.current?.select();
          window.navigator.clipboard.writeText(password);
     }, [password])


     // RETURNING THE VALUES
     return (
          <div className="w-screen h-screen flex flex-wrap justify-center content-center " >

               <div className="p-2 border-8 rounded-xl" style={{ borderColor: "black" }}>
                    <h1 className="pb-10">RANDOM PASSWORD GENERATOR</h1>
                    <div className="innerclass flex justify-center p-10 overflow-hidden rounded-lg ">
                         <div className="border-4 rounded-lg " style={{ borderColor: "black" }}>
                              <input style={{ fontSize: "40px", backgroundColor: "rgba(255,255,255, 0)", borderColor: "black" }} type="text"
                                   id="input"
                                   placeholder="password"
                                   value={password}
                                   ref={create_ref}
                                   readOnly
                              />
                         </div>
                         <div className="copy  border-4 flex flex-wrap justify-center rounded-lg bg-blue-500">

                              <button onClick={copy_password} style={{ fontWeight: "bolder", height: "100%", width: "100%" }}>copy</button>
                         </div>
                    </div>

                    <div className="addons flex flex-wrap justify-center">
                         <div className="flex justify-center pr-2 border-0">
                              <input id="slider" type="range"
                                   min={8}
                                   max={25}
                                   value={length}
                                   onChange={(e) => {
                                        setlength(e.target.value)

                                   }}
                              />
                         </div>
                         <div className="pl-0 ">
                              <label style={{ fontSize: "20px" }} htmlFor="">LENGTH={length}</label>
                         </div>
                         <div className="flex justify-center">
                              <input className="check  mr-2 ml-2" type="checkbox"
                                   defaultChecked={allownumber}
                                   id="num"
                                   onChange={() => {
                                        setallownumber((prev) => !prev);
                                   }}
                              />
                              <label className=" pb-0" style={{ fontSize: "20px" }} htmlFor="num">ALLOWNUMBER</label>
                         </div>
                         <div className="flex justify-center ">
                              <input className="check  mr-2 ml-2 pt-0 " type="checkbox"
                                   defaultChecked={allowsymbol}
                                   id="symbolid"
                                   onChange={() => {
                                        setallowsymbol((prev) => !prev);
                                   }} />
                              <label className=" pb-0 mr-0" style={{ fontSize: "20px" }} htmlFor="symbolid">ALLOWSYMBOL</label>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default App
