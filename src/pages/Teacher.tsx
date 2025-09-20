// import { memo, useState, type FormEvent } from 'react';
// import { useTeacher } from '../api/useTeacher';


// const Teacher = () => {
//     const [name, setName] = useState("")
//     const [salary, setSalary] = useState("")
//     const {getTeacher, createteacher, deleteteacher } = useTeacher()

//       const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const teacher1 = {name, salary:Number(salary)}
//         createteacher.mutate(teacher1)
//       };
      
//       const handleDelete = (id: number) =>{
//         deleteteacher.mutate(id)
//       }
//   return (
//     <div className="Comments">
//       <form onSubmit={handleSubmit} action="">
//         <input
//           value={text}
//           onChange={(event) => setText(event.target.value)}
//           type="text"
//         />
//         <button>submit</button>
//       </form>
//       <ul>
//         {data?.map((item: any) => (
//           <li key={item.id}>
//             <span>{item.text}</span>
//             <button onClick={() => handleDelete(item.id)}>delete</button>
//             <button>update</button>
//           </li>
//         ))}
//       </ul>
//       {isLoading && <h1>Loading...</h1>}
//     </div>
//   );
// };

// export default memo(Teacher);