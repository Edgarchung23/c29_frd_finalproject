import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import { createUser } from "../hook/userAPI";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import registerImg from "../image/inclusion-7197545_1280.png"


//-------------------------------------------------------------------------------------------

const RegisterForm = () => {
  const navigate = useNavigate();
  const [chiSurname, setChiSurname] = useState('')
  const [chiGivenName, setChiGivenName] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>();

  // -----------------------------------------------

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data)
      Swal.fire({
        title: "Registration successful",
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })

      navigate("/");
    },
    onError: (data) => {
      Swal.fire({
        title: "Sorry," + data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordInput1 = password;
    const passwordInput2 = confirmPassword;

    if (passwordInput1 !== passwordInput2) {
      return Swal.fire({
        title: "Sorry, The password does not match!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (!email) {
      return Swal.fire({
        title: "Sorry, Email cannot be empty",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (!phoneNumber) {
      return Swal.fire({
        title: "Sorry, Phone number cannot be empty",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    try {
      const formData = { firstName, lastName, chiSurname, chiGivenName, email, phoneNumber, password };
      mutate(formData);
    } catch (error: any) {
      console.error("Error during registration:", error);
    }
  };

  // -----------------------------------------------

  return (
    <MDBContainer fluid className='RegisterFormContainer' >
      <div className="registerImg">
        <img src={registerImg}></img>
      </div>
      <MDBCardBody className='RegisterFormBody'>
        <h3 className='registerTitle'>Registration </h3>
        <form className="registerFormFetch" onSubmit={handleRegister}>
          <MDBRow className="registercontrol">
            <MDBCol md='6' className='firstNameInput'>
              <MDBInput
                wrapperClass='mb-4'
                label='Last Name'
                size='lg'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBCol>
            <MDBCol md='6' className='lastNameInput '>
              <MDBInput
                wrapperClass=''
                label='First Name'
                size='lg'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </MDBCol>

            <MDBCol md='6' className='firstNameInput'>
              <MDBInput
                wrapperClass='mb-4'
                label='姓氏　　　　　　　　　　　(Option)'
                size='lg'
                type='text'
                value={chiSurname}
                onChange={(e) => setChiSurname(e.target.value)}
              />
            </MDBCol>
            <MDBCol md='6' className='lastNameInput'>
              <MDBInput
                wrapperClass='mb-4'
                label='名稱　　　　　　　　　　　(Option)'
                size='lg'
                id='form2'
                type='text'
                value={chiGivenName}
                onChange={(e) => setChiGivenName(e.target.value)}
              />
            </MDBCol>
            <MDBInput
              wrapperClass='mb-4 lastNameInput'
              label='Your Email'
              size='lg'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4 lastNameInput'
              label='Phone Number'
              size='lg'
              type='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
            />
            <MDBInput
              wrapperClass='mb-4 lastNameInput'
              label='Password'
              size='lg'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4 lastNameInput'
              label='Confirm your password'
              size='lg'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </MDBRow>
          <div className='roleLabel'>
            {/* <h6 className=''>用戶身份:</h6> */}
            {/* <MDBRadio
              name='inlineRadio'
              id='inlineRadio3'
              value='option3'
              label='需要人士'
              inline
            /> */}
            {/* <MDBRadio
              name='inlineRadio'
              id='inlineRadio1'
              value='option1'
              label='義工'
              inline
            />
            <MDBRadio
              name='inlineRadio'
              id='inlineRadio2'
              value='option2'
              label='捐贈者'
              inline
            />
            <MDBRadio
              name='inlineRadio'
              id='inlineRadio2'
              value='option2'
              label='非牟利機構'
              inline
            /> */}
          </div>
          <div className='submitContainer   '>
            <MDBBtn id="resetBtn" color='danger' size='lg'>
              Reset all
            </MDBBtn>
            <MDBBtn type="submit" id="submitBtn" color='info' size='lg'>
              Submit form
            </MDBBtn>
          </div>
        </form>
      </MDBCardBody>
    </MDBContainer >
  );
}

export default RegisterForm;
