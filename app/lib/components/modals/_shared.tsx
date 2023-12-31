import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '~/components';

type SharedModalProps = {
  buttonText: string;
  headerText: string;
  children: React.ReactNode;
};

export const SharedModal = ({
  buttonText,
  headerText,
  children,
}: SharedModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    console.log('submit');
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
