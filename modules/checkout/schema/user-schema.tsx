import  { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
  email: 
  z
  .string()
  .email("не валідний email"),

  password: 
  z.
  string().
  min(6,"min length 6 symbols").
  max(20,"max length 20 symbols")
});


export type userFormType = z.infer<typeof  userSchema>

const data = useForm<userFormType>( );