import NodeType from './NodeType';
import FileNode from './FileNode';
export class FileTable extends NodeType {
  constructor(list: [string, string][]) {
    super(undefined)
    let self = this
    this.hashTable = new Map(list.map(function(e): [string, FileNode] {
      return [e[0], new FileNode(e[1], self, e[0])]
    }))
  }
  private hashTable: Map<string, FileNode>
  name() { return "root" }
  dump() {}
  async node(path?: string | string[]): Promise<NodeType | void> {
    let pathlist = path ? Array.isArray(path) ? path : path.split('/') : []
    let next = pathlist.shift()
    if (next) {
      let nextnode = this.hashTable.get(next)
      if (!nextnode) return
      return await nextnode.node(pathlist)
    }
    else {
      return this
    }
  }
  async list() {
    return Array.from(this.hashTable.keys())
  }
}

export default FileTable
