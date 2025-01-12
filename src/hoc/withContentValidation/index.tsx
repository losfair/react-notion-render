import React, { PropsWithChildren } from 'react'

import { ParsedBlock, SimpleBlock } from '../../types/Block'

import EmptyBlock from '../../components/common/EmptyBlock'
import { getDefaultProps, getMediaProps } from './constants'
import { slugify } from '../../utils/slugify'
import { blockTypeClassname } from '../../utils/getClassname'

export interface WithContentValidationProps {
  classNames?: boolean
  emptyBlocks?: boolean
  block: ParsedBlock
  slugifyFn?: (text: string) => string
  simpleTitles?: boolean
  index?: SimpleBlock[]
}

export type DropedProps = PropsWithChildren<{
  className?: string
  checked: boolean
  plainText: string
  config: WithContentValidationProps
  slugifyFn: ((text: string) => string) | null
  language?: string
  media?: {
    alt: string
    src: string
    href?: string
    name?: string
    extension?: string
    player?: string
  }
  index?: SimpleBlock[]
}>

function withContentValidation(
  Component: React.ComponentType<DropedProps>
): React.FC<WithContentValidationProps> {
  return ({
    emptyBlocks,
    slugifyFn,
    classNames,
    simpleTitles,
    ...props
  }: WithContentValidationProps) => {
    const hasContent = props.block.hasContent()
    if (!hasContent && !emptyBlocks) {
      return null
    }

    let returnedProps: DropedProps = {
      checked: false,
      children: null,
      plainText: '',
      slugifyFn: simpleTitles ? null : (slugifyFn ?? slugify),
      className: classNames ? blockTypeClassname(props.block.notionType) : undefined,
      config: {
        classNames: classNames,
        block: props.block,
        emptyBlocks
      }
    }

    if (props.block.isMedia()) {
      returnedProps.media = getMediaProps(props)
    } else {
      returnedProps = { ...returnedProps, ...getDefaultProps(props) }
    }

    return hasContent ? <Component {...returnedProps} /> : <EmptyBlock />
  }
}

export default withContentValidation
