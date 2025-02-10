import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CiLogin } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";

export function EmailTokenDialog({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          type="submit"
          className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-6 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <CiLogin size={48} />
          <span className="ml-3 text-lg">Entrar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md text-center flex-col items-center justify-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center">
            <FaRegCheckCircle
              size={48}
              className="text-green-500 items text-center"
            />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="font-bold text-lg">
          Seu email foi enviado com sucesso!
        </AlertDialogDescription>
        <AlertDialogDescription>
          Utilize o link de acesso enviado para efetuar o login.
        </AlertDialogDescription>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
          className="mt-4"
        >
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
