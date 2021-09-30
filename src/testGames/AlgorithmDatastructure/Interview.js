// Cay va Rung
// run with node js

const { performance } = require('perf_hooks');

// timer
class Timer {
  constructor() {
    this.start = performance.now();
    this.end = this.start;
  }

  // to see time elapsed since the object is created, must call this function
  endTimer() {
    this.end = performance.now();
    console.log(`Time elapsed: ${(this.end - this.start) / 1000} seconds`);
  }
}

class Node {
  constructor(ma_node, node_cha, ten_node) {
    this.ma_node = ma_node;
    this.node_cha = node_cha;
    this.ten_node = ten_node;
  }
}

let NodesList = [];

// check if a list contain an Node element using ma_node
function isListContainsNode(m_nodelist, ma_node) {
  for (val of m_nodelist) {
    if (val.ma_node == ma_node) {
      return true;
    }
  }

  return false;
}

function getNodeByMaNode(m_nodeList, ma_node) {
  for (val of m_nodeList) {
    if (val.ma_node == ma_node) return val;
  }

  return undefined;
}

function loadFileAndInitObjects(file) {
  // create node 0
  NodesList.push(new Node(0, null, 'node_0'));

  require('fs')
    .readFileSync(file, 'utf-8')
    .split(/\r?\n/)
    .forEach(function (line) {
      let res = line.split(' ');

      let ma_node = parseInt(res[0]);
      let ma_node_cha = parseInt(res[1]);
      let ten_node = res[2];

      // if (isListContainsNode(NodesList, ma_node)) {
      //     console.log("current node is already exist!");
      //     return false;
      // }

      if (!isListContainsNode(NodesList, ma_node_cha)) {
        console.log('parent node of current node not exits of ma_node: ');
        return false;
      }

      let node_cha = getNodeByMaNode(NodesList, ma_node_cha);

      NodesList.push(new Node(ma_node, node_cha, ten_node));
    });

  // console.log("all: ", NodesList);
  return true;
}

// node backward recursion from child to parent
function findParentOfNode(node, ma_target_node) {
  if (node.node_cha == null) return null;
  if (node.node_cha.ma_node == ma_target_node) return node.node_cha;
  return findParentOfNode(node.node_cha, ma_target_node);
}

function is_X_parent_of_Y(ma_node_X, ma_node_Y) {
  let m_timer = new Timer();

  let node_Y = getNodeByMaNode(NodesList, ma_node_Y);

  if (!findParentOfNode(node_Y, ma_node_X)) {
    m_timer.endTimer();
    return false;
  }

  m_timer.endTimer();

  return true;
}

function printAllChildren() {
  // this function require a next node pointer in every node but time's running out :(
}

function main() {
  if (!loadFileAndInitObjects('./interview.txt')) return;

  console.log(is_X_parent_of_Y(1, 2)); // true
}

main();
