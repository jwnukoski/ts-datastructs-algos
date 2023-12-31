/**
 * @description A node in a singly linked list.
 */
class Node {
  data: any
  next: Node | null

  constructor (data: any) {
    this.data = data
    this.next = null
  }
}

/**
 * @description A singly linked list.
 */
export class SinglyLinkedList {
  #head: Node | null
  #tail: Node | null
  #length: number

  constructor () {
    this.#head = null
    this.#tail = null
    this.#length = 0
  }

  /**
   * @description Adds a new node to the end of the list.
   * @param data Data to add to the list.
   */
  push (data: any): void {
    const node = new Node(data)

    if (this.#head === null) { this.#head = node }

    if (this.#tail !== null) { this.#tail.next = node }

    this.#tail = node

    this.#length++
  }

  /**
   * @description Removes the last node from the list, and returns it.
   * @returns {Node | null} The removed node, or null if the list is empty.
   */
  pop (): Node | null {
    // Empty list
    if (this.#head === null || this.#tail === null) { return null }

    const oldTail = this.#tail

    // Only 1 item in the list. Head and tail match.
    if (this.#head === this.#tail && this.#length === 1) {
      this.#head = null
      this.#tail = null
      this.#length = 0

      return oldTail
    }

    // Find the new tail
    let newTail = this.#head
    while (newTail.next !== this.#tail && newTail.next !== null) {
      newTail = newTail.next
    }

    // Garbage collect the old tail
    newTail.next = null

    this.#length--

    return oldTail
  }

  /**
   * @description Returns the node at the given index, or null if the index is out of bounds.
   * @param index Index within the list to get the node from.
   * @returns {Node | null} The node at the given index, or null if the index is out of bounds.
   */
  get (index: number): Node | null {
    if (index < 0 || index >= this.#length) { return null }

    let counter = 0
    let current = this.#head

    while (counter !== index && current !== null) {
      current = current.next
      counter++
    }

    if (counter !== index) { return null }

    return current
  }

  /**
   * @description Sets the value of the node at the given index to the given data. Returns true if successful, false otherwise.
   * @param index Index of the node to set the value of in the list.
   * @param data Node data to set.
   * @returns true if successful, false otherwise.
   */
  set (index: number, data: any): boolean {
    const node = this.get(index)

    if (node === null) { return false }

    node.data = data

    return true
  }

  /**
   * @description Removes the node at the given index from the list, and returns it.
   * @param index Index in the list to put the new node.
   * @param data Data of the new node to insert.
   * @returns {boolean} True is successful, false otherwise
   */
  insert (index: number, data: any): boolean {
    if (index < 0 || index > this.#length) { return false }

    if (index === this.#length) {
      this.push(data)
      return true
    }

    const newNode = new Node(data)

    if (index === 0) {
      newNode.next = this.#head
      this.#head = newNode
      this.#length++
      return true
    }

    const prevNode = this.get(index - 1)
    if (prevNode === null) { return false }

    newNode.next = prevNode.next
    prevNode.next = newNode
    this.#length++

    return true
  }

  /**
   * @description Removes the node at the given index from the list, and returns it.
   * @param index Index of the node to remove.
   * @returns {Node | null} The removed node, or null if the index is out of bounds.
   */
  remove (index: number): Node | null {
    if (index < 0 || index >= this.#length) { return null }

    if (index === 0 && this.#head !== null) {
      const oldHead = this.#head
      this.#head = this.#head.next ?? null
      this.#length--
      return oldHead
    }

    const prevNode = this.get(index - 1)
    if (prevNode === null) { return null }

    const node = prevNode.next
    prevNode.next = node ?? null
    this.#length--

    return node
  }

  /**
   * @description Removes and returns the head. Can be useful for queues.
   * @returns {Node | null} The removed node, or null if the list is empty.
   */
  removeHead (): Node | null {
    if (this.#head === null) { return null }

    const oldHead = this.#head

    if (this.#head.next !== null) {
      this.#head = this.#head.next
    }

    this.#length--

    return oldHead
  }

  /**
   * @description Removes and returns the tail.
   * @returns {Node | null} The removed node, or null if the list is empty.
   */
  removeTail (): Node | null {
    if (this.#tail === null || this.#head === null) { return null }

    const oldTail: Node | null = this.#tail
    let newTail: Node | null = this.#head

    while (newTail?.next !== oldTail) {
      newTail = newTail?.next ?? null
    }

    this.#length--

    this.#tail = newTail
    this.#tail.next = null

    return oldTail
  }

  /**
   * @description Returns an array of the data in the list.
   * @returns {any[]} An array of the data in the list.
   */
  toArray (): any[] {
    const array: any[] = []

    let currentNode: Node | null = this.#head
    while (currentNode !== null) {
      array.push(currentNode.data)
      currentNode = currentNode.next
    }

    return array
  }

  /**
   * @description Returns the length of the list.
   * @returns {number} The length of the list.
   */
  length (): number {
    return this.#length
  }

  /**
   * @description Returns the head of the list.
   * @returns {Node | null} The head of the list.
   */
  head (): Node | null {
    return this.#head
  }

  /**
   * @description Returns the tail of the list.
   * @returns {Node | null} The tail of the list.
   */
  tail (): Node | null {
    return this.#tail
  }
}
