import { Container as BaseContainer, ContainerProps, theme } from '@chakra-ui/react'

const Container = (props: ContainerProps) => {
  return (
    <BaseContainer
      maxWidth={[
        '100%',
        theme.sizes.container.sm,
        theme.sizes.container.md,
        theme.sizes.container.lg,
        theme.sizes.container.xl
      ]}
      {...props}
    />
  )
}

export default Container
