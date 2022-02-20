import React from 'react'

import Text from '../../types/Text'
import { getClassname } from '../../utils/getClassname'

import Image, { Props as ImageProps } from '../../components/common/Image'
import Link, { Props as LinkProps } from '../../components/common/Link'
import Video, { Props as VideoProps } from '../../components/common/Video'

type WrappedComponentPropsType = Text
export type CustomComponentPropsType = ImageProps | LinkProps | VideoProps

interface CustomComponent {
  match: RegExp
  component: React.ComponentType<CustomComponentPropsType>
  transformProps?: (
    props: WrappedComponentPropsType
  ) => CustomComponentPropsType
}

export const customComponents: CustomComponent[] = [
]
