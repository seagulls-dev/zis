import Swal from 'sweetalert2'

export const errorPopup = (title: any, msg: any) => {
    Swal.fire({
        title: title,
        text: msg,
        icon: 'error',
        toast: true,
        position: 'center',
        confirmButtonText: 'Close it',
        confirmButtonColor: "#1890ff",
    }).then(res => {
        return res
    })
}

export const successPopup = (data: any) => {
    Swal.fire({
        text: data.message,
        icon: 'success',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }).then(res => {
        return res
    })
}
