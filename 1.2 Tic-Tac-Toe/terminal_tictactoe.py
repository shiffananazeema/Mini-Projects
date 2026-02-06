
wins = [(0, 1, 2), (3, 4, 5), (6, 7, 8),
        (0, 3, 6), (1, 4, 7), (2, 5, 8),
        (0, 4, 8), (2, 4, 6)]

p = [" "] * 9
turn = "X"

def print_board():
    print(f" {p[0]} | {p[1]} | {p[2]}")
    print("---+---+---")
    print(f" {p[3]} | {p[4]} | {p[5]}")
    print("---+---+---")
    print(f" {p[6]} | {p[7]} | {p[8]}")

def winner():
    for a,b,c in wins:
        if p[a] == p[b] == p[c] != " ":
            return p[a]
    return None
        
while True:
    print_board()

    user_input = input(f"{turn} move (1-9): ").strip() 
    
    if user_input == "z":
        print("Exiting game...")
        break

    try:
        m = int(user_input) - 1
    except ValueError:
        print("Invalid")
        continue

    if m < 0 or m > 8:
        print("Invalid")
        continue

    if p[m] != " ":
        print("Taken")
        continue

    p[m] = turn
    print()
    
    w = winner()

    if w:
        print_board()
        print(f"{w} wins!")
        break

    if " " not in p:
        print_board()
        print("Tie!")
        break

    turn = "O" if turn == "X" else "X"
