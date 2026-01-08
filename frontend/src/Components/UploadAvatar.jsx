import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

// Recebe onImageSelect para enviar a foto ao formulário principal
// Recebe currentImage para mostrar a foto que já vem da base de dados
export default function UploadAvatar({ size = 80, onImageSelect, currentImage }) {
  const [avatarSrc, setAvatarSrc] = React.useState(currentImage);

  // Sincroniza o preview caso a imagem mude no componente pai (ex: carregamento da DB)
  React.useEffect(() => {
    if (currentImage) setAvatarSrc(currentImage);
  }, [currentImage]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setAvatarSrc(base64);      // Atualiza o círculo (preview local)
        onImageSelect(base64);    // Avisa o componente pai (PerfilMenuContent)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ButtonBase
      component="label"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc', // Opcional: para mostrar que é clicável
        '&:hover': { opacity: 0.8 }
      }}
    >
      <Avatar
        alt="Perfil"
        src={avatarSrc}
        sx={{ width: size, height: size }}
      />
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}