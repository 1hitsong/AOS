export const markdownRules = {
    list_item: (node, children, parent, styles) =>
        <Text key={node.key} style={[styles.list_item]}> • {children}</Text>
}