import Swal from "sweetalert2";

export const showConfirmationDialog = async (
  title,
  html,
  confirmation = "Si",
  cancelar = "false",
) => {
  try {
    const result = await Swal.fire({
      title,
      html,
      icon: "info",
      showCancelButton: cancelar,
      confirmButtonColor: "#3085d6",
      confirmButtonText: confirmation,
    });
    return result.isConfirmed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const showErrorMessage = async (title, html) => {
  try {
    await Swal.fire({
      title,
      html,
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.error(error);
  }
}

export const showSuccessMessage = async (title, html) => {
  try {
    await Swal.fire({
      title,
      html,
      icon: "success",
      confirmButtonColor: "#3085d6",
      timer: 1000,
    });
  } catch (error) {
    console.error(error);
  }

}