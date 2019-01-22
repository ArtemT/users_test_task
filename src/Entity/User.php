<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 */
class User
{
    const NUMBER_OF_ITEMS = 25;

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=40)
     * @Assert\NotBlank()
     */
    public $lastname;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=40)
     * @Assert\NotBlank()
     */
    public $firstname;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=40)
     * @Assert\NotBlank()
     */
    public $patname;

    /**
     * @var int
     *
     * @ORM\Column(type="smallint")
     * @Assert\Choice(choices={1, 2, 3}, message="Wrong status.")
     */
    public $status;

    public function __construct() {
        $this->status = 1;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }
}
