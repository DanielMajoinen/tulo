import { TransactionHistoryBoardTemplate } from './transaction-history'
import { type BoardTemplate, type InputTemplate, type PropertyTemplate } from './types'

const templates: Record<string, BoardTemplate> = {
  'transaction-history': TransactionHistoryBoardTemplate
}

const getBoardTemplate = ({ id }: { id: string }): BoardTemplate | null => templates[id] ?? null

const getInputTemplate = ({ boardId, inputId }: { boardId: string; inputId: string }): InputTemplate | null =>
  getBoardTemplate({ id: boardId })?.inputs[inputId] ?? null

const getPropertyTemplate = ({
  boardId,
  inputId,
  propertyId
}: {
  boardId: string
  inputId: string
  propertyId: string
}): PropertyTemplate | null => getInputTemplate({ boardId, inputId })?.properties?.[propertyId] ?? null

const getAllBoardTemplates = (): BoardTemplate[] => Object.values(templates)

export const Templates = {
  get: {
    allBoards: getAllBoardTemplates,
    board: getBoardTemplate,
    input: getInputTemplate,
    property: getPropertyTemplate
  }
}
