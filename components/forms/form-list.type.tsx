/*type Form = {
    id: string,
    title: string,
    description: string | null,
    createdAt: Date,
    _count: {
        responses: number;
    }
}*/
// 👆 Tipo manual que ya no hace falta mantener(se define algo que ya se habia definido antes). estaría repitiendo algo que ya existe (en el modelo de prisma)
import { Form } from '@/lib/generated/prisma'

type FormWithCount = Form & {
  _count: { responses: number }
}
// 👆 Importa el tipo `Form` generado automáticamente por Prisma y le agrega la propiedad _count que no estaba incluida en el Form
export type FormListProps = {
  forms: FormWithCount[]
}
// Se actualiza solo si cambias el modelo en `schema.prisma`.
// si cambia el modelo en un futuro ese tipo cambia tambien
